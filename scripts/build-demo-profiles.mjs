/**
 * Build the browser-ready demo profile directory.
 *
 * The app runs from file:// via run.bat, where fetch() of local JSON is
 * unreliable in several browsers. This script turns the canonical profile
 * pack into a plain <script> include instead.
 *
 * Usage: node scripts/build-demo-profiles.mjs
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'docs/BOPEU Demo Profiles/BOPEU_Demo_Profiles.json');
const outputPath = resolve(root, 'js/demo-profiles.js');

const GROUP_ORDER = [
  { id: 'member', label: 'BOPEU Member' },
  { id: 'staff-marketing', label: 'BOPEU Staff - Marketing' },
  { id: 'staff-sales', label: 'BOPEU Staff - Sales & Client Services' },
  { id: 'staff-finance', label: 'BOPEU Staff - Finance & Payroll' },
  { id: 'staff-welfare', label: 'BOPEU Staff - Welfare & Claims' },
  { id: 'staff-regional', label: 'BOPEU Staff - Regional & Shop Steward' },
  { id: 'staff-legal', label: 'BOPEU Staff - Legal & Industrial Relations' },
  { id: 'admin', label: 'BOPEU Admin' },
  { id: 'partner', label: 'Benefit Partner' }
];

const ROLE_GROUPS = {
  ROLE_MARKETING: 'staff-marketing',
  ROLE_SALES_RECRUITMENT: 'staff-sales',
  ROLE_FINANCE_AUDITOR: 'staff-finance',
  ROLE_WELFARE_CLAIMS: 'staff-welfare',
  ROLE_REGIONAL_COORDINATOR: 'staff-regional',
  ROLE_OPERATIONS_LEGAL: 'staff-legal',
  ROLE_SUPER_ADMIN: 'admin'
};

const ROLE_LABELS = {
  ROLE_MEMBER: 'BOPEU Member',
  ROLE_MARKETING: 'Marketing & Partnerships',
  ROLE_SALES_RECRUITMENT: 'Sales & Client Services',
  ROLE_FINANCE_AUDITOR: 'Finance & Payroll',
  ROLE_WELFARE_CLAIMS: 'Welfare & Claims',
  ROLE_REGIONAL_COORDINATOR: 'Regional & Shop Steward',
  ROLE_OPERATIONS_LEGAL: 'Legal & Industrial Relations',
  ROLE_SUPER_ADMIN: 'BOPEU Admin',
  ROLE_BENEFIT_PARTNER: 'Benefit Partner'
};

const MEMBER_IMAGES = {
  'Jackson Michaels': 'BOPEU Member - Jackson Michaels.jpg',
  'James Dudumang': 'BOPEU Member - James Dudumang.jpg',
  'Kabelo Modise': 'BOPEU Member - Kabelo Modise.avif',
  'Mercy Peters': 'BOPEU Member - Mercy Peters.jpg',
  'Siyanda Kefitlile': 'BOPEU Member - Siyanda Kefitlile.webp',
  'Patricia Kgaope': 'BOPEU Member - Patricia Kgaope.avif'
};

const STAFF_IMAGES = {
  'Naledi Molefe': 'BOPEU Staff - Marketing.jpg',
  'Kago Ndlovu': 'BOPEU Staff - Sales & Client Services.jpg',
  'Otsile Sechele': 'BOPEU Admin.jpg'
};

const PARTNER_IMAGES = {
  'Keitumetse Mooketsi': 'Benefit Partner.jpg'
};

const IMAGE_ROOT = 'Assets/Demo Profile Images';
const NO_IMAGE = `${IMAGE_ROOT}/NO IMAGE.png`;
const DEMO_PASSWORD = '1234';

function imageFor(name, map) {
  const file = map[name];
  return file ? `${IMAGE_ROOT}/${file}` : NO_IMAGE;
}

function firstNameOf(name) {
  return String(name || '').trim().split(/\s+/)[0] || '';
}

function surnameOf(name) {
  return String(name || '').trim().split(/\s+/).slice(1).join(' ');
}

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function demoWhatsApp(prefix, index) {
  return `+267 ${prefix} 000 ${String(index).padStart(3, '0')}`;
}

function statusOf(value) {
  return String(value || '').toLowerCase().includes('active') ? 'active' : 'pending_verification';
}

function memberProfileFrom(source, whatsapp) {
  const employment = source.employment || {};
  const payroll = source.payroll || {};
  const funeral = source.funeral_policy || {};
  const dependants = (funeral.dependents || []).map((d) => ({
    name: d.name || '',
    relation: d.relationship || '',
    dob: d.date_of_birth || '',
    cover: d.coverage_status || ''
  }));

  return {
    personal: {
      firstName: firstNameOf(source.display_name),
      surname: surnameOf(source.display_name),
      fullName: source.display_name,
      omang: source.omang_number || '',
      phone: whatsapp,
      email: '',
      dob: source.date_of_birth || ''
    },
    employment: {
      sectorId: '',
      sectorLabel: employment.ministry_or_parent || employment.employer || '',
      employerId: '',
      employerLabel: employment.employer || '',
      departmentId: '',
      jobTitle: employment.position || '',
      basicSalary: payroll.basic_salary_bwp_demo || 0
    },
    location: {
      district: employment.work_region || '',
      town: employment.work_city || '',
      area: '',
      workStation: employment.physical_work_location || employment.work_city || ''
    },
    memberNo: source.membership_number || '',
    joined: source.member_since || employment.service_start_date || '',
    status: statusOf(source.membership_status),
    payroll: {
      expectedMonthly: payroll.expected_monthly_subscription_bwp || 0,
      groupLifeFee: payroll.group_life_fee_bwp_demo || 0,
      funeralAdminFee: payroll.funeral_admin_fee_bwp_demo || 0,
      checkoffStatus: payroll.checkoff_status || ''
    },
    funeral: {
      scheme: funeral.scheme || '',
      policyStatus: funeral.policy_status || '',
      dependants
    }
  };
}

function normaliseMember(source, index) {
  const whatsapp = demoWhatsApp('71', 101 + index);
  return {
    id: source.record_id,
    recordId: source.record_id,
    groupId: 'member',
    groupLabel: 'BOPEU Member',
    portal: 'member',
    roleKey: 'ROLE_MEMBER',
    roleLabel: ROLE_LABELS.ROLE_MEMBER,
    firstName: firstNameOf(source.display_name),
    surname: surnameOf(source.display_name),
    displayName: source.display_name,
    fullName: source.full_legal_name_demo || source.display_name,
    whatsapp,
    whatsappDigits: digitsOnly(whatsapp),
    password: DEMO_PASSWORD,
    workPlace: source.employment?.physical_work_location || source.employment?.employer || '',
    jobTitle: source.employment?.position || '',
    image: imageFor(source.display_name, MEMBER_IMAGES),
    landing: 'index.html',
    memberProfile: memberProfileFrom(source, whatsapp),
    source
  };
}

function normaliseStaff(source, index) {
  const roleKey = source.system_role;
  const groupId = ROLE_GROUPS[roleKey] || 'admin';
  const whatsapp = demoWhatsApp('72', 201 + index);
  return {
    id: source.record_id,
    recordId: source.record_id,
    groupId,
    groupLabel: GROUP_ORDER.find((g) => g.id === groupId)?.label || 'BOPEU Staff',
    portal: 'staff',
    roleKey,
    roleLabel: ROLE_LABELS[roleKey] || source.department || 'BOPEU Staff',
    firstName: firstNameOf(source.display_name),
    surname: surnameOf(source.display_name),
    displayName: source.display_name,
    fullName: source.full_name_demo || source.display_name,
    whatsapp,
    whatsappDigits: digitsOnly(whatsapp),
    password: DEMO_PASSWORD,
    workPlace: source.office_location || source.department || 'BOPEU',
    jobTitle: source.job_title || '',
    department: source.department || '',
    staffId: source.staff_id || '',
    email: source.corporate_email || '',
    image: imageFor(source.display_name, STAFF_IMAGES),
    landing: 'admin-dashboard.html',
    metrics: source.metrics || {},
    permissions: source.permissions || '',
    dataScope: source.data_scope || '',
    currentTask: source.current_task || '',
    lastAuditEvent: source.last_audit_event || '',
    source
  };
}

function normalisePartner(source, index) {
  const name = source.account_display_name || source.organization || '';
  const whatsapp = demoWhatsApp('73', 301 + index);
  return {
    id: source.record_id,
    recordId: source.record_id,
    groupId: 'partner',
    groupLabel: 'Benefit Partner',
    portal: 'partner',
    roleKey: 'ROLE_BENEFIT_PARTNER',
    roleLabel: ROLE_LABELS.ROLE_BENEFIT_PARTNER,
    firstName: firstNameOf(name),
    surname: surnameOf(name),
    displayName: name,
    fullName: source.full_name_demo || name,
    whatsapp,
    whatsappDigits: digitsOnly(whatsapp),
    password: DEMO_PASSWORD,
    workPlace: source.organization || '',
    jobTitle: source.job_title || '',
    organization: source.organization || '',
    organizationId: source.organization_id || '',
    branch: source.branch_location || '',
    partnerRole: source.partner_role || '',
    email: source.corporate_email || '',
    image: imageFor(name, PARTNER_IMAGES),
    landing: 'partner-dashboard.html',
    metrics: source.metrics || {},
    permissions: source.permissions || '',
    dataScope: source.data_scope || '',
    offers: source.offers || [],
    lastAuditEvent: source.last_audit_event || '',
    source
  };
}

const raw = JSON.parse(await readFile(sourcePath, 'utf8'));
const male = raw.groups['BOPEU Members - Male'] || [];
const female = raw.groups['BOPEU Members - Female'] || [];
const staff = raw.groups['BOPEU Staff'] || [];
const partners = raw.groups['Benefit Partner Users'] || [];

const profiles = [
  ...male.concat(female).map(normaliseMember),
  ...staff.map(normaliseStaff),
  ...partners.map(normalisePartner)
];

const groups = GROUP_ORDER.map((group) => ({
  ...group,
  count: profiles.filter((profile) => profile.groupId === group.id).length
}));

const duplicateNumbers = profiles
  .map((p) => p.whatsappDigits)
  .filter((value, index, all) => all.indexOf(value) !== index);

if (duplicateNumbers.length) {
  throw new Error(`Duplicate demo WhatsApp numbers: ${duplicateNumbers.join(', ')}`);
}

const output = `/* AUTO-GENERATED by scripts/build-demo-profiles.mjs — do not edit by hand. */
/* Source: docs/BOPEU Demo Profiles/BOPEU_Demo_Profiles.json */
window.BOPEU_DEMO_PASSWORD = ${JSON.stringify(DEMO_PASSWORD)};
window.BOPEU_DEMO_GROUPS = ${JSON.stringify(groups, null, 2)};
window.BOPEU_ROLE_MATRIX = ${JSON.stringify(raw.role_access_matrix || [], null, 2)};
window.BOPEU_DEMO_META = ${JSON.stringify(raw.metadata || {}, null, 2)};
window.BOPEU_DEMO_PROFILES = ${JSON.stringify(profiles, null, 2)};
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, 'utf8');

const counts = groups.map((g) => `${g.id}: ${g.count}`).join(', ');
console.log(`Wrote ${outputPath}`);
console.log(`Profiles: ${profiles.length} (${counts})`);
