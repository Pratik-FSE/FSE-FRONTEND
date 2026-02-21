const path = require('path');
const fs = require('fs-extra');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const sendgrid = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, '..', 'data');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

fs.ensureDirSync(DATA_DIR);
fs.ensureDirSync(UPLOADS_DIR);

// configure SendGrid if provided
if (process.env.SENDGRID_API_KEY) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
}

app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*'
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// simple helpers
function readJSON(name, fallback = []) {
  const p = path.join(DATA_DIR, name);
  try {
    if (!fs.existsSync(p)) return fallback;
    return fs.readJsonSync(p);
  } catch (e) {
    return fallback;
  }
}

function writeJSON(name, data) {
  const p = path.join(DATA_DIR, name);
  fs.writeJsonSync(p, data, { spaces: 2 });
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeProject(raw, index, clientsById) {
  const id = raw?.id ?? `project-${index + 1}`;
  const title = typeof raw?.title === 'string' && raw.title.trim()
    ? raw.title.trim()
    : `Project ${index + 1}`;
  const slug = typeof raw?.slug === 'string' && raw.slug.trim()
    ? raw.slug.trim()
    : slugify(title) || `project-${index + 1}`;
  const categories = Array.isArray(raw?.categories)
    ? raw.categories.filter((item) => typeof item === 'string' && item.trim())
    : typeof raw?.category === 'string' && raw.category.trim()
      ? [raw.category.trim()]
      : ['Experiential'];
  const clientId = typeof raw?.clientId === 'string' && raw.clientId.trim()
    ? raw.clientId.trim()
    : null;
  const client = typeof raw?.client === 'string' && raw.client.trim()
    ? raw.client.trim()
    : clientId && clientsById.has(clientId)
      ? clientsById.get(clientId)
      : 'Client';
  const parsed = raw?.date ? new Date(raw.date) : null;
  const date = parsed && !Number.isNaN(parsed.getTime())
    ? parsed.toISOString()
    : new Date().toISOString();
  const location = typeof raw?.location === 'string' ? raw.location : '';
  const stats = Array.isArray(raw?.stats)
    ? raw.stats
        .filter(
          (item) =>
            item &&
            typeof item.label === 'string' &&
            item.label.trim() &&
            item.value !== undefined &&
            item.value !== null
        )
        .map((item) => ({
          label: String(item.label).trim(),
          value: String(item.value),
        }))
    : [];

  return {
    ...raw,
    id,
    title,
    slug,
    categories,
    clientId,
    client,
    date,
    location,
    stats,
  };
}

function normalizeClient(raw, index) {
  return {
    ...raw,
    id: raw?.id || `client-${index + 1}`,
    name:
      typeof raw?.name === 'string' && raw.name.trim()
        ? raw.name.trim()
        : `Client ${index + 1}`,
  };
}

function normalizeService(raw, index) {
  return {
    ...raw,
    id: raw?.id || `service-${index + 1}`,
    title:
      typeof raw?.title === 'string' && raw.title.trim()
        ? raw.title.trim()
        : `Service ${index + 1}`,
    summary:
      typeof raw?.summary === 'string' && raw.summary.trim()
        ? raw.summary.trim()
        : '',
  };
}

// Content endpoints (read-only)
app.get('/api/projects', (req, res) => {
  const projectItems = readJSON('projects.json', []);
  const clientItems = readJSON('clients.json', []);
  const clientsById = new Map(
    clientItems.map((client) => [client.id, client.name]).filter((entry) => entry[0] && entry[1])
  );
  const normalized = projectItems.map((item, index) =>
    normalizeProject(item, index, clientsById)
  );
  res.status(200).json(normalized);
});

app.get('/api/projects/:slug', (req, res) => {
  const projectItems = readJSON('projects.json', []);
  const clientItems = readJSON('clients.json', []);
  const clientsById = new Map(
    clientItems.map((client) => [client.id, client.name]).filter((entry) => entry[0] && entry[1])
  );
  const normalized = projectItems.map((item, index) =>
    normalizeProject(item, index, clientsById)
  );
  const found = normalized.find((p) => p.slug === req.params.slug);
  if (!found) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(found);
});

app.get('/api/clients', (req, res) => {
  const items = readJSON('clients.json', []);
  const normalized = items.map((item, index) => normalizeClient(item, index));
  res.status(200).json(normalized);
});

app.get('/api/services', (req, res) => {
  const items = readJSON('services.json', []);
  const normalized = items.map((item, index) => normalizeService(item, index));
  res.status(200).json(normalized);
});

// Contact endpoint
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        error: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      name,
      email,
      phone = '',
      city = '',
      eventType = '',
      budget = '',
      message,
      subject,
    } = req.body;

    const payload = {
      name,
      email,
      phone,
      city,
      eventType,
      budget,
      subject: subject || 'Website contact',
      message,
      date: new Date().toISOString()
    };

    // Try SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM) {
      try {
        await sendgrid.send({
          to: process.env.SENDGRID_TO || process.env.SENDGRID_FROM,
          from: process.env.SENDGRID_FROM,
          subject: `${payload.subject} — ${payload.name}`,
          text: `${payload.message}\n\nFrom: ${payload.name} <${payload.email}>`,
          html: `<p>${payload.message}</p><hr/><p>From: ${payload.name} &lt;${payload.email}&gt;</p>`
        });

        // also log to file
        const contacts = readJSON('contacts.json', []);
        contacts.unshift(payload);
        writeJSON('contacts.json', contacts);

        return res.status(200).json({
          ok: true,
          method: 'sendgrid',
          message: 'Contact submitted successfully',
        });
      } catch (err) {
        console.error('SendGrid error:', err?.message || err);
      }
    }

    // Try SMTP if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.SMTP_TO || process.env.SMTP_FROM || process.env.SMTP_USER,
          subject: `${payload.subject} — ${payload.name}`,
          text: `${payload.message}\n\nFrom: ${payload.name} <${payload.email}>`
        });

        const contacts = readJSON('contacts.json', []);
        contacts.unshift(payload);
        writeJSON('contacts.json', contacts);

        return res.status(200).json({
          ok: true,
          method: 'smtp',
          message: 'Contact submitted successfully',
        });
      } catch (err) {
        console.error('SMTP error:', err?.message || err);
      }
    }

    // Fallback: write to local contacts.json
    try {
      const contacts = readJSON('contacts.json', []);
      contacts.unshift(payload);
      writeJSON('contacts.json', contacts);
      return res.status(200).json({
        ok: true,
        method: 'file',
        message: 'Contact submitted successfully',
      });
    } catch (err) {
      console.error('Write fallback error:', err);
      return res.status(500).json({ ok: false, error: 'Unable to process contact' });
    }
  }
);

// Admin upload (simple token auth)
const upload = multer({ dest: UPLOADS_DIR });
app.post('/api/admin/upload', upload.single('file'), (req, res) => {
  const token = req.header('x-admin-token') || req.query.token;
  if (!token || token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  if (!req.file) return res.status(400).json({ error: 'file required' });

  // return accessible URL (serving statically)
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ ok: true, url });
});

// Serve uploads
app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`Neon-flux backend running on http://localhost:${PORT}`);
});
