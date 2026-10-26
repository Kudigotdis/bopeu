/* =====================================================
   1. EMPLOYMENT REFERENCE DATA - 5 level taxonomy
   Used for member registration (Form A - Employment)
   ===================================================== */
window.BOPEU_EMPLOYMENT_DATA = {
    sectors: [
        {
            id: "central_gov",
            label: "Central Government",
            shortLabel: "Central Government",
            desc: "Ministries & Government Departments",
            icon: "🏛",
            employers: [
                {
                    id: "mptw",
                    label: "Ministry of Transport & Public Works",
                    departments: [
                        { id: "buildings", label: "Buildings", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["General Artisan (Plumber / Electrician / Carpenter / Welder)", "Painter", "Mason", "General Maintenance Worker"] },
                            { label: "Services & Support", jobs: ["Storekeeper / Inventory Assistant", "Messenger", "Cleaner", "Security Guard"] }
                        ] },
                        { id: "roads", label: "Roads", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["Roads Maintenance Worker", "Roads Worker", "General Artisan", "Heavy Equipment Operator", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Storekeeper", "Messenger", "Security Guard", "Night Watchman"] }
                        ] },
                        { id: "dems", label: "Mechanical & Electrical Services (DEMS)", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["General Artisan (Electrician)", "General Artisan (Plumber)", "Maintenance Technician", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger", "Security Guard"] }
                        ] },
                        { id: "cto", label: "Central Transport Organisation (CTO)", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["CTO Driver", "Heavy Equipment Operator", "Mechanic Assistant", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Yardman", "Cleaner", "Security Guard"] }
                        ] }
                    ]
                },
                {
                    id: "moh",
                    label: "Ministry of Health",
                    departments: [
                        { id: "hospitals", label: "Government Hospitals", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly", "Laundry Attendant", "Clinical Kitchen Worker", "Groundsman / Yard Assistant"] },
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Storekeeper / Inventory Assistant", "Security Guard", "Night Watchman"] }
                        ] },
                        { id: "clinics", label: "Primary Clinics", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly", "Pest Control Officer"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Groundsman", "Security Guard"] }
                        ] },
                        { id: "healthposts", label: "Health Posts", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger"] }
                        ] },
                        { id: "support_services", label: "Support Services", cadreGroups: [
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Storekeeper", "Security Guard", "Driver"] }
                        ] }
                    ]
                },
                {
                    id: "moa",
                    label: "Ministry of Agriculture",
                    departments: [
                        { id: "agric_research", label: "Agricultural Research", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Agriculture)", "Agricultural Research Assistant", "Livestock Assistant"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger", "Security Guard"] }
                        ] },
                        { id: "vet", label: "Veterinary Services", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Veterinary)", "Livestock Assistant", "Driver"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger"] }
                        ] },
                        { id: "field_offices", label: "Field Offices", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Agriculture / Fisheries)", "Driver", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Security Guard", "Storekeeper"] }
                        ] },
                        { id: "livestock", label: "Livestock Stations", cadreGroups: [
                            { label: "Field Services", jobs: ["Livestock Assistant", "Field Assistant", "Yardman"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Security Guard"] }
                        ] }
                    ]
                },
                {
                    id: "moes",
                    label: "Ministry of Education & Skills Development",
                    departments: [
                        { id: "schools", label: "Government Schools", cadreGroups: [
                            { label: "Facilities & Support", jobs: ["General Maintenance Worker", "Groundsman / Yard Assistant", "Caretaker", "Cook", "Cleaner"] },
                            { label: "Services & Support", jobs: ["Messenger", "Security Guard"] }
                        ] },
                        { id: "boarding", label: "Boarding Facilities", cadreGroups: [
                            { label: "Facilities & Support", jobs: ["Matron Assistant", "Cook", "Laundry Attendant", "Caretaker", "Cleaner"] },
                            { label: "Services & Support", jobs: ["Storekeeper", "Security Guard"] }
                        ] },
                        { id: "regional", label: "Regional Education Offices", cadreGroups: [
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Driver", "Watchman"] }
                        ] }
                    ]
                },
                {
                    id: "met",
                    label: "Ministry of Environment & Tourism",
                    departments: [
                        { id: "parks", label: "National Parks", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Field Assistant", "Wildlife Ranger Assistant", "Horticulture Assistant"] },
                            { label: "Services & Support", jobs: ["Driver", "Cleaner", "Security Guard"] }
                        ] },
                        { id: "wildlife", label: "Wildlife Conservation", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Field Assistant", "Wildlife Ranger Assistant"] },
                            { label: "Services & Support", jobs: ["Messenger", "Cleaner"] }
                        ] },
                        { id: "forestry", label: "Forestry", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Forestry Worker", "Field Assistant"] },
                            { label: "Services & Support", jobs: ["Driver", "Cleaner"] }
                        ] },
                        { id: "waste", label: "Waste Management", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Waste Management Team Member", "Waste Segregation Worker"] },
                            { label: "Services & Support", jobs: ["Refuse Truck Driver", "Loader", "Cleaner"] }
                        ] }
                    ]
                }
            ]
        },
        {
            id: "local_council",
            label: "Local Authority / Council",
            shortLabel: "Local Authority",
            desc: "City, Town & District Councils",
            icon: "🏙",
            employers: [
                { id: "gcc", label: "Gaborone City Council" },
                { id: "fcc", label: "Francistown City Council" },
                { id: "ltc", label: "Lobatse Town Council" },
                { id: "jtc", label: "Jwaneng Town Council" },
                { id: "kdc", label: "Kweneng District Council" },
                { id: "cdc", label: "Central District Council" },
                { id: "other_council", label: "Other Council" }
            ],
            departments: [
                { id: "civil", label: "Civil Engineering & Infrastructure", cadreGroups: [
                    { label: "Technical Support", jobs: ["Maintenance Technician", "Pipefitter", "Road Maintenance Worker", "Storm Water Drainage Worker", "Council Yard Watchman"] }
                ] },
                { id: "public_health", label: "Public Health & Environmental Services", cadreGroups: [
                    { label: "Municipal Operations", jobs: ["Refuse Collector / Loader", "Refuse Truck Driver", "Street Cleaner", "Landfill Attendant", "Market Supervisor Assistant"] }
                ] },
                { id: "social", label: "Social & Community Development", cadreGroups: [
                    { label: "Community & Facility Maintenance", jobs: ["Primary School Caretaker", "Cook", "Community Worker Assistant", "Cemetery Attendant"] }
                ] },
                { id: "commercial", label: "Commercial Services", cadreGroups: [
                    { label: "Municipal Operations", jobs: ["Abattoir Worker", "Cemetery Attendant", "Bus Rank Attendant", "Market Assistant"] }
                ] }
            ]
        },
        {
            id: "land_board",
            label: "Land Board",
            shortLabel: "Land Board",
            desc: "Land Administration & Field Services",
            icon: "🗺",
            employers: [
                { id: "mlb", label: "Malete Land Board" },
                { id: "tlb", label: "Tlokweng Land Board" },
                { id: "nlb", label: "Ngwato Land Board" },
                { id: "other_lb", label: "Other Land Board / Sub-Land Board" }
            ],
            departments: [
                { id: "allocation", label: "Land Administration & Allocation", cadreGroups: [
                    { label: "Field Cadres", jobs: ["Land Board Field Assistant", "Survey Assistant", "Demarcation Assistant"] }
                ] },
                { id: "compliance", label: "Compliance & Inspection", cadreGroups: [
                    { label: "Field Cadres", jobs: ["Land Inspection Assistant", "Compliance Support Officer"] }
                ] },
                { id: "ops", label: "Administrative & Field Operations", cadreGroups: [
                    { label: "Logistics & General Support", jobs: ["Land Board Driver (4x4)", "Office Cleaner", "Messenger", "Yardman", "Security Guard"] },
                    { label: "Administrative Cadres", jobs: ["Registration Clerk", "Records Assistant", "Customer Service Support Clerk"] }
                ] }
            ]
        },
        {
            id: "parastatal",
            label: "Parastatal / SOE",
            shortLabel: "Parastatal",
            desc: "Public Utilities & State-Owned Enterprises",
            icon: "⚙️",
            employers: [
                { id: "wuc", label: "Water Utilities Corporation (WUC)" },
                { id: "bpc", label: "Botswana Power Corporation (BPC)" },
                { id: "br", label: "Botswana Railways" },
                { id: "ab", label: "Air Botswana" },
                { id: "bmc", label: "Botswana Meat Commission (BMC)" },
                { id: "bhc", label: "Botswana Housing Corporation (BHC)" },
                { id: "bamb", label: "Botswana Agricultural Marketing Board (BAMB)" },
                { id: "bpost", label: "BotswanaPost" },
                { id: "btc", label: "Botswana Telecommunications Corporation (BTC)" }
            ],
            departments: [
                { id: "utilities", label: "Utilities & Maintenance", cadreGroups: [
                    { label: "Utilities & Maintenance", jobs: ["Meter Reader", "Water Pipefitter / Mains Repairer", "Electrical Line Assistant", "Pump Station Operator", "Plant Maintenance Worker"] }
                ] },
                { id: "logistics", label: "Transportation & Logistics", cadreGroups: [
                    { label: "Logistics & Warehousing", jobs: ["Warehouse Assistant", "Grain Handler", "Postal Courier / Delivery Driver", "Freight Handler"] }
                ] },
                { id: "facilities", label: "Facilities & Support", cadreGroups: [
                    { label: "Facilities & Support", jobs: ["Abattoir Processing Assistant", "Estate Maintenance Helper", "General Utility Assistant"] }
                ] }
            ]
        }
    ]
};

/* =====================================================
   2. BOPEU OFFICES & AFFILIATES
   ===================================================== */
window.BOPEU_OFFICES = [
    { id: "gaborone", name: "BOPEU Headquarters Gaborone", category: "Corporate Hubs & Headquarters", plot: "Plot 54374, CBD, Grand Union Building, Gaborone", phone: "+267 3214 200", tel: "2673214200", email: "info@bopeu.org.bw", district: "Gaborone" },
    { id: "francistown", name: "BOPEU Francistown Office", category: "Corporate Hubs & Headquarters", plot: "Raphael Sikwane House, Plot 4900, Sam Nujoma Street, Light Industrial Area, Francistown", phone: "+267 231 0000", tel: "2672310000", email: "francistown@bopeu.org.bw", district: "Francistown" },
    { id: "palapye", name: "BOPEU Palapye Office", category: "Regional Offices", plot: "Plot 23229, Palapye", phone: "+267 480 0000", tel: "2674800000", email: "palapye@bopeu.org.bw", district: "Central" },
    { id: "maun", name: "BOPEU Maun Office", category: "Regional Offices", plot: "Plot 693, Main Mall, Maun", phone: "+267 688 0000", tel: "2676880000", email: "maun@bopeu.org.bw", district: "North West" },
    { id: "kang", name: "BOPEU Kang Office", category: "Regional Offices", plot: "Plot KA5 / KA6 / KA7, Kang", phone: "+267 651 1198", tel: "2676511198", email: "kang@bopeu.org.bw", district: "Kgalagadi" }
];

window.BOPEU_AFFILIATES = [
    { name: "Diagnofirm Medical Laboratories", sector: "Health", detail: "Health & fitness discounts for members" },
    { name: "Babereki SACCOS", sector: "Finance", detail: "Cooperative savings and credit solutions" },
    { name: "Babereki Investments", sector: "Finance", detail: "Investment opportunities for members" },
    { name: "BLIC", sector: "Insurance", detail: "Insurance arm of the BOPEU family" }
];

/* =====================================================
   3. CONTACTS / CAMPAIGN PHONE NUMBERS
   ===================================================== */
window.BOPEU_CONTACTS = {
    generalLine: "2673214200",
    supportPhone: "+267 393 4222",
    supportTel: "2673934222",
    whatsapp: "2673214200",
    email: "info@bopeu.org.bw",
    supportEmail: "support@bopeu.org.bw",
    baberekiEmail: "communications@babereki.co.bw",
    baberekiContact: "+267 392 2526 / +267 316 2335",
    buildingPhone: "316 2335",
    buildingWhatsapp: "74906982",
    accessWhatsapp1: "26775750701",
    accessWhatsapp2: "2677324028"
};

/* =====================================================
   3b. DOCUMENT VAULT - OFFICIAL PDF FORMS (downloads)
   ===================================================== */
window.BOPEU_PDF_FORMS = [
    { name: "Member Self-Service Platform Guide", disc: "BOPEU \u00b7 Presentation guide", file: "docs/PDFs/00-BOPEU_Member_Self_Service_Platform_Presentation_Guide.pdf" },
    { name: "Extended Family Application", disc: "BLIC \u00b7 BOPEU Group Funeral Scheme", file: "docs/PDFs/BOPEU_BABEREKI_EXTENDED FAMILY APPLICATION FORM.pdf" },
    { name: "Extended Family (Funeral Cover)", disc: "BOPEU Group Funeral Scheme \u00b7 Bona Life", file: "docs/PDFs/BOPEU_FAMILY - EXTENDED FAMILY.pdf" },
    { name: "Group Life Nomination of Beneficiaries", disc: "BLIC \u00b7 Group Life Assurance form", file: "docs/PDFs/BOPEU_BLIC-APPLICATION - GROUP LIFE ASSURANCE NOMINATION OF BENEFICIARIES.pdf" },
    { name: "Know Your Customer (KYC)", disc: "BLIC \u00b7 Group Funeral Scheme claim form", file: "docs/PDFs/BOPEU_BLIC-KNOW YOUR CUSTOMER.pdf" },
    { name: "Funeral Cover Amendment", disc: "Babereki Insurance Brokers \u00b7 Bona Life", file: "docs/PDFs/BOPEU_BABEREKI_AMMENDMENT FORM.pdf" },
    { name: "Membership Application", disc: "Babereki Insurance Brokers \u00b7 Bona Life", file: "docs/PDFs/BOPEU_BABEREKI_MEMBERSHIP  APPLICATION FORM.pdf" }
];

/* =====================================================
   4. STATS / MEMBERSHIP NUMBER FORMAT
   ===================================================== */
window.BOPEU_STATS = {
    members: "37,000+",
    offices: "5",
    services: "9",
    affiliates: "4",
    memberNoPrefix: "BOPEU-37K-"
};

/* =====================================================
   5. ARTICLES & NOTICES
   ===================================================== */
window.BOPEU_ARTICLES = [
    {
        id: "article1",
        modalId: "article1-modal",
        title: "Educational Bursary Scheme — What You Need to Know",
        preview: "Interest-free financial assistance up to P 30,000 for your tuition, accommodation, books or research. Repay over up to 24 months..."
    },
    {
        id: "article2",
        modalId: "article2-modal",
        title: "BOPEU & Archein Hardware Building Materials Partnership",
        preview: "Build your dream home without a deposit — up to P 200,000 at 4% monthly interest on a reduced balance, with FREE nationwide delivery over P 100,000..."
    },
    {
        id: "article3",
        modalId: "article3-modal",
        title: "BOPEU Funeral Cover, underwritten by Metropolitan Life",
        preview: "Minimal red tape, no medical tests. Subscription of just 1% of basic salary (capped P 39.90 - P 100.00) for coreP 60,000 cover..."
    },
    {
        id: "article4",
        modalId: "article4-modal",
        title: "BOPEU Lending Schemes: Access Bank & In-House Loans",
        preview: "From quick P 500 loans to P 3,000,000 mortgages. Compare Access Bank facilities with BOPEU Direct / Babereki SACCOS in-house loans..."
    },
    {
        id: "article5",
        modalId: "article5-modal",
        title: "Diagnofirm+, Your Health, Your Union, Your Benefit",
        preview: "Exclusive health & fitness discounts: no 10% patient share, up to 35% off without medical aid, Virgin Active 10% off, Penalty Box 15% off..."
    },
    {
        id: "article6",
        modalId: "article6-modal",
        title: "Who We Are & How to Become a BOPEU Member",
        preview: "The Botswana Public Employees Union, founded 2007 from the BCSA (roots 1942/1960). Learn how to register at your workplace or office..."
    }
];

window.BOPEU_NOTICES = [
    {
        id: "n1",
        title: "Revised Lending Scheme \u2014 Effective 1 March 2026",
        body: "Take advantage of the revised lending scheme through our Access Bank partnership. WhatsApp the word 'payslip' to apply.",
        date: "2026-09-14",
        category: "Finance & Lending",
        cardLabel: "MEMBER FINANCE UPDATE",
        summary: "BOPEU members can begin an enquiry about the revised lending arrangement with Access Bank by sending the word \u201cpayslip\u201d through the officially confirmed WhatsApp application channel.",
        intro: "The revised scheme is stated as effective from 1 March 2026. Members considering a loan should first confirm which Access Bank product and offer applies to them, what the current terms are, and whether the repayments fit their budget.",
        sections: [
            {
                heading: "How to begin",
                paragraphs: [
                    "Send the single word payslip to the WhatsApp number or official WhatsApp link designated for this BOPEU\u2013Access Bank offer. The app should open the verified recipient with the message prefilled; it must not send documents automatically.",
                    "A WhatsApp enquiry is an application starting point, not confirmation that a loan has been approved. The bank may ask for supporting information, identity checks and affordability or credit assessments before making a decision.",
                ],
            },
            {
                heading: "Prepare before you apply",
                bullets: [
                    "Have your latest payslip available in case the authorised bank representative requests it.",
                    "Be ready to provide identity, employment, income and residential information through a verified bank channel if requested.",
                    "If the application asks for a bank statement or other document, check that the recipient is an official Access Bank Botswana or BOPEU-approved contact before sending it.",
                    "Keep a copy of your application reference and any written offer or quotation you receive.",
                ]
            },
            {
                heading: "Understand the cost before accepting",
                paragraphs: [
                    "Ask for the amount you qualify to borrow, the interest rate and how it is calculated, all fees and insurance costs, the repayment period, the instalment amount, the total amount repayable, and the consequences of missed payments.",
                    "Do not judge an offer only by the amount paid into your account or the monthly instalment. Compare the full cost and check how the proposed repayment would affect household expenses, transport, food, school costs and other existing commitments.",
                ],
            },
            {
                heading: "Who qualifies?",
                paragraphs: [
                    "Eligibility, qualifying employer groups, maximum loan amounts, pricing, repayment terms and required documents must be confirmed against the current BOPEU-approved scheme terms and the bank's assessment. Do not assume that BOPEU membership alone guarantees approval or a particular interest rate.",
                ],
            },
        ],
        importantNotice: "Never send an Omang image, payslip, bank statement, PIN, password or security verification code to an unverified WhatsApp number. Confirm the official Access Bank or BOPEU channel before sharing any document.",
        memberActions: [
            "Open the verified Access Bank lending contact from this notice.",
            "Send the message: payslip.",
            "Wait for instructions from the verified representative and provide documents only after checking the recipient.",
            "Read the written offer and repayment schedule before accepting.",
        ]
    },
    {
        id: "n2",
        title: "Monthly Subscription & Funeral Cover Deduction",
        body: "BOPEU subscriptions and funeral cover premiums are deducted via payroll stop-order on the 15th of each month.",
        date: "2026-09-01",
        category: "Membership & Payroll",
        cardLabel: "PAYROLL REMINDER",
        summary: "BOPEU membership subscriptions and applicable funeral-cover premiums are processed through the member\u2019s authorised payroll stop-order. Check your payslip and raise any unexpected difference early.",
        intro: "The monthly payroll stop-order cycle has a stated 15th-of-the-month cut-off in BOPEU membership paperwork. Use your payslip to check which deductions were actually processed and whether the amounts match your membership and cover arrangements.",
        sections: [
            {
                heading: "What may appear on your payslip",
                paragraphs: [
                    "The BOPEU membership subscription and any applicable funeral-cover or optional-family-cover premiums are not necessarily the same line item. Check the deduction descriptions and compare them with your membership records, cover selection and latest approved schedule.",
                    "BOPEU's current public funeral-cover page describes the membership subscription as 1% of basic salary, capped between P39.90 and P100.00. Online and older application forms can show different figures, so use the current amount confirmed by BOPEU payroll and your applicable signed terms rather than assuming an old form is still current.",
                ],
            },
            {
                heading: "What the 15th means",
                paragraphs: [
                    "The supplied notice identifies the 15th of each month as the payroll stop-order date. BOPEU paperwork also refers to the 15th as a monthly cut-off. Depending on your salary group, ministry or employer payroll cycle, a deduction may be processed or visible on the payslip at a different point in the payroll run. Confirm the operative date with your payroll office if the timing is unclear.",
                ],
            },
            {
                heading: "What members should check",
                bullets: [
                    "Confirm that the BOPEU subscription line appears and that the amount matches your current approved contribution.",
                    "Check funeral-cover deductions separately, including any selected parent or extended-family cover and any premium-waiver option.",
                    "If you changed ministry, employer, salary group, bank account or payroll details, check that the stop-order followed the change correctly.",
                    "If the deduction is missing, duplicated or different from the approved amount, keep the relevant payslip and contact your payroll office and BOPEU for reconciliation.",
                    "If salary deductions stop, do not assume membership or insurance cover remains uninterrupted; ask BOPEU/Babereki to confirm your current status in writing.",
                ]
            },
            {
                heading: "Why it matters",
                paragraphs: [
                    "A missing or incorrect deduction can create uncertainty about membership standing or insurance premiums being received by the relevant administrator. Early reporting gives payroll and BOPEU a chance to investigate the entry, timing or remittance before the issue continues into later months.",
                ],
            },
        ],
        importantNotice: "Do not calculate optional funeral-cover premiums from a generic notice alone. Premiums depend on the applicable policy, selected dependants and cover options. The current signed membership/policy schedule and confirmation from BOPEU/Babereki take precedence over older forms.",
        memberActions: [
            "Review the latest payslip after the monthly payroll run.",
            "Compare subscription and funeral-cover deductions against your current approved schedule.",
            "Save the payslip if an entry is missing or incorrect.",
            "Contact payroll and BOPEU/Babereki to request reconciliation and keep the reference number.",
        ]
    },
    {
        id: "n3",
        title: "Diagnofirm+ Health Partnership Reminder",
        body: "Present your BOPEU membership card at Diagnofirm Medical Laboratories for exclusive discounts on your lab tests.",
        date: "2026-08-26",
        category: "Health & Member Benefits",
        cardLabel: "MEMBER BENEFIT",
        summary: "Present your valid BOPEU membership card when visiting Diagnofirm Medical Laboratories and confirm the applicable member benefit before your test is performed.",
        intro: "BOPEU members can use the union's Diagnofirm health-partnership information to ask about eligible laboratory services and member concessions. Carry your membership card and verify the terms for the specific service you need before proceeding.",
        sections: [
            {
                heading: "At the laboratory",
                bullets: [
                    "Show your current physical or digital BOPEU membership card to the reception or verification desk before payment or service processing.",
                    "Tell staff that you are asking to use the BOPEU member benefit and ask them to confirm your eligibility using the approved verification process.",
                    "Ask whether your requested test is included, whether a referral or medical-aid authorisation is needed, and what amount you will be expected to pay.",
                    "Keep your receipt or transaction reference so any billing or discount query can be followed up.",
                ]
            },
            {
                heading: "What the published benefit says",
                paragraphs: [
                    "BOPEU's benefit reference describes the Diagnofirm partnership as including no 10% patient share and up to 35% off for members without medical aid. The exact application can depend on the service, medical-aid arrangements, exclusions and the partner's current verification rules.",
                    "\u201cUp to 35%\u201d is a maximum headline, not a promise that every test receives a 35% discount. Have Diagnofirm confirm the actual price or concession for your test before consenting to the service.",
                ],
            },
            {
                heading: "Protect your health information",
                paragraphs: [
                    "Only provide the information needed by the laboratory to identify you, process a test or confirm benefit eligibility. BOPEU membership verification is not the same as permission to display your medical history to the union or other partners.",
                    "Never share your BOPEU password, security code or another person's membership card. If a discount is not applied, ask the laboratory for a written explanation and report the issue through the app or BOPEU's official contact channel.",
                ],
            },
        ],
        importantNotice: "Benefits, exclusions, eligible test categories and medical-aid handling must be confirmed with Diagnofirm under the current partner agreement. This notice does not replace a clinician's advice, a medical-aid scheme rule or the laboratory's quotation.",
        memberActions: [
            "Open your digital BOPEU membership card before arriving or bring the physical card.",
            "Tell the reception desk you want to verify the BOPEU benefit before the service is processed.",
            "Ask for the final price, applicable concession and any exclusions.",
            "Keep your receipt and report any unresolved eligibility or billing issue.",
        ]
    },
    {
        id: "n4",
        title: "Funeral Claim Deadline Reminder",
        body: "Funeral claims must be filed within 6 months of death and all documents submitted within 12 months.",
        date: "2026-08-20",
        category: "Funeral Cover & Family Support",
        cardLabel: "TIME-SENSITIVE REMINDER",
        summary: "Notify the funeral-scheme administrator within 6 months of the date of death and submit all required claim documents within 12 months of the date of death.",
        intro: "If a member or covered dependant passes away, contact the BOPEU/Babereki claims team as soon as possible. Do not wait until all paperwork has been collected before giving the required claim notification: notification and final document submission are separate deadlines.",
        sections: [
            {
                heading: "Two deadlines to remember",
                paragraphs: [
                    "Record the date of death, date of first notification, the name of the person or office notified, and the claim reference. Ask for written acknowledgement of the notification and a checklist of outstanding documents.",
                    "Do not treat the 12-month document period as permission to postpone notifying the claim. The 6-month notification deadline is a separate requirement under the published scheme information.",
                ],
                bullets: [
                    "Claim notification: submit written notification within 6 months from the date of death.",
                    "Supporting documents: submit the complete set of documents requested for the claim within 12 months from the date of death.",
                ]
            },
            {
                heading: "Documents commonly requested",
                paragraphs: [
                    "This is a preparation list, not a guarantee that every document is required in every case. The administrator may request further proof depending on who died, the relationship to the member, the cover selected and the policy terms. Use the current claim checklist issued for your particular scheme.",
                ],
                bullets: [
                    "Completed claim form supplied by the current claims administrator.",
                    "Certified death certificate.",
                    "Certified Omang/identity document for the claimant and proof of age where requested.",
                    "Proof of relationship to the deceased; for a spouse claim, a marriage certificate may be requested.",
                    "Birth certificate for a claim involving a minor child, where applicable.",
                    "Police report where required by the policy, including specified accidental-death circumstances.",
                    "Claimant's bank-account confirmation or proof of bank account.",
                    "Affidavit, proof of name change or relationship, KYC form, or further evidence if requested by the administrator.",
                ]
            },
            {
                heading: "Where to start",
                paragraphs: [
                    "Contact the current BOPEU/Babereki claims office or your nearest BOPEU office and say that you need to notify a funeral claim. Ask which claim form, insurer/administrator, certification standard and submission channel apply to your policy. Keep copies of everything submitted and proof of delivery.",
                    "If some documents are delayed, still make the claim notification within the 6-month period and ask the claims officer to record what is outstanding and when it must be supplied. Do not assume an extension has been granted unless you receive written confirmation.",
                ],
            },
        ],
        importantNotice: "Deadlines are measured from the date of death. Late notification or incomplete submission may affect admissibility under the policy. Current BOPEU webpages and older/alternate downloadable forms may not name the same insurer or administrator; obtain the current claim pack from BOPEU/Babereki rather than reusing a saved old form.",
        memberActions: [
            "Notify the claims administrator in writing as soon as possible and within 6 months of the date of death.",
            "Request a claim reference and a current document checklist.",
            "Collect certified documents and any policy-specific evidence requested.",
            "Submit all required documents within 12 months of the date of death and keep proof of submission.",
            "Use the app's claim tracker to record follow-ups and outstanding documents, if available.",
        ]
    },
];

/* =====================================================
   6B. NOTICE GALLERY (Updates / Notices tab)
   Photos live in Assets/notice_gallery.
   ===================================================== */
window.BOPEU_GALLERY = [
    { src: "Assets/notice_gallery/00.jpg", alt: "BOPEU notice gallery image 1" },
    { src: "Assets/notice_gallery/01.jpg", alt: "BOPEU notice gallery image 2" },
    { src: "Assets/notice_gallery/02.jpg", alt: "BOPEU notice gallery image 3" },
    { src: "Assets/notice_gallery/03.jpg", alt: "BOPEU notice gallery image 4" },
    { src: "Assets/notice_gallery/04.jpg", alt: "BOPEU notice gallery image 5" },
    { src: "Assets/notice_gallery/05.jpg", alt: "BOPEU notice gallery image 6" }
];

/* =====================================================
   6A. TIMELINE FEED POSTS (Home / Timeline tab)
   Cover artwork lives in Assets/timeline_feed_images.
   ===================================================== */
window.BOPEU_TIMELINE_POSTS = [
    {
        id: "what-we-stand-for",
        title: "What We Stand For",
        teaser: "Justice. Equality. Representation. Solidarity. Empowerment.",
        date: "September 2026",
        category: "Our Values",
        tag: "Values",
        cover: "Assets/timeline_feed_images/What_We_Stand_For-Our-Values.jpg",
        paragraphs: [
            "BOPEU works to protect workers, strengthen their collective voice and promote fairer workplaces and better conditions of service across Botswana.",
            "A fair workplace does not happen by accident. It takes informed workers, effective representation, constructive engagement and the willingness to stand together. BOPEU helps members understand workplace processes, raise concerns through appropriate channels and participate in collective efforts to improve conditions of service."
        ],
        sections: [
            { h: "Effective labour representation", b: "BOPEU represents members’ workplace interests through appropriate union structures and processes. Depending on the issue and applicable rules, support may include advice, engagement with an employer, assistance during a grievance or disciplinary process, and representation in formal labour forums." },
            { h: "Protecting workers’ rights", b: "Members should be treated fairly and consistently, with workplace procedures handled according to applicable laws, policies, collective agreements and conditions of service. Keep records and seek guidance early if you believe a process is unfair." },
            { h: "Fair wages and better working conditions", b: "BOPEU advocates for fair remuneration, transparent application of employment conditions, safe workplaces and improvements to conditions of service. Salary adjustments, allowances and other changes depend on negotiations, applicable agreements, employer decisions and formal implementation; distinguish proposals from approved outcomes." },
            { h: "Social justice, equality and good governance", b: "A fair public service values dignity, equal treatment, accountability and access to fair processes. Members should be able to raise concerns without discrimination and understand how workplace decisions are made." },
            { h: "Empowered and informed members", b: "Read verified notices, access approved documents, attend branch activities and ask questions through the appropriate shop steward or official contact channel." },
            { h: "Worker solidarity", b: "Solidarity means supporting one another respectfully across ministries, districts, occupations and generations. Share verified information and participate constructively in union activities." },
            { h: "What BOPEU does", b: "BOPEU’s work may include labour representation, member organising, dispute-resolution guidance, collective bargaining, grievance support and assistance during disciplinary hearings, subject to union procedures, applicable law and the circumstances of each case." }
        ],
        memberActions: [
            "Read official notices and distinguish confirmed decisions from proposals.",
            "Keep appointment letters, payslips and relevant correspondence for workplace matters.",
            "Contact the relevant shop steward, regional office or BOPEU channel for case-specific guidance.",
            "Do not post confidential personnel records or another member’s personal information publicly."
        ]
    },
    {
        id: "member-benefits",
        title: "Member Benefits — What You Get",
        teaser: "Your membership card connects you to more.",
        date: "September 2026",
        category: "Member Benefits",
        tag: "Benefits",
        cover: "Assets/timeline_feed_images/memeber_benefits-What-You-Get.webp",
        paragraphs: [
            "Explore services, schemes and partner offers that may be available to eligible members, from insurance and savings to health, lifestyle and family support.",
            "BOPEU membership can connect members with union services, Babereki-related financial and insurance services, and participating partner offers. The app is a place to discover current offers, read their terms and learn how to apply or verify eligibility."
        ],
        sections: [
            { h: "Your digital membership card", b: "Your card supports membership identification in approved app and partner workflows. It does not automatically guarantee every discount, loan, insurance benefit or service. Eligibility, good-standing status, partner participation and offer terms may apply." },
            { h: "Financial and savings services", b: "Members may be able to explore savings and credit services through Babereki SACCOS or other approved arrangements. Before accepting credit, review interest and fees, repayment frequency, total repayment, required documents and consequences of missed payments." },
            { h: "Insurance and family protection", b: "The app may provide information about funeral cover, group life assurance and other insurance products. Covered persons, benefit amounts, exclusions, waiting periods, premiums and claim requirements are determined by current policy wording and insurer decisions." },
            { h: "Health and wellness offers", b: "Confirm the provider branch, covered service, discount calculation, exclusions and verification process before booking or paying. A discount is not a substitute for medical advice or medical-aid authorisation where required." },
            { h: "Shopping, travel and lifestyle offers", b: "Offers may be limited to selected locations, products, dates or payment methods. Check the individual offer card for validity dates, proof-of-membership requirements and terms." },
            { h: "Educational and family support", b: "Where an assistance programme is open, the app should explain eligibility, eligible expenses, required documents, application windows, assessment criteria and how decisions are communicated. Published maximums are not guaranteed awards." }
        ],
        memberActions: [
            "Open the specific benefit card and read its eligibility criteria and full terms.",
            "Check offer dates and whether it applies at your intended branch.",
            "Use only official application and partner contacts shown in the verified app.",
            "Keep receipts, application references and written confirmations.",
            "Report outdated partner details through official BOPEU channels."
        ]
    },
    {
        id: "family-protection",
        title: "Complete Family Protection",
        teaser: "Because your family deserves financial security when it matters most.",
        date: "September 2026",
        category: "Insurance & Family",
        tag: "Insurance",
        cover: "Assets/timeline_feed_images/Complete_Family_Protection-Insurance.jpg",
        paragraphs: [
            "Learn how member funeral cover is intended to support eligible families, what to verify in the policy and how to prepare for a claim.",
            "Bereavement can bring emotional strain alongside urgent practical and financial responsibilities. Funeral cover is designed to help eligible beneficiaries manage some costs associated with a death. Keep policy information and family details up to date."
        ],
        sections: [
            { h: "Who may be covered?", b: "The supplied programme description refers to members, spouses and children under 21. The exact definition of an eligible spouse or child, age limits, dependency requirements, cover start date and extended-family options must be checked against the current policy schedule." },
            { h: "Understand the cover", b: "Check the insured benefit amount, premium or payroll deduction, covered lives, exclusions, waiting periods, policy status and claim process. A headline benefit amount may not apply to every member or circumstance." },
            { h: "Keep family information current", b: "Update spouse and dependent details where required and confirm that names, identity information and relationships match supporting records. Submit sensitive documents only through approved secure channels—not a public timeline or unverified WhatsApp number." },
            { h: "When a death occurs", b: "Contact the official BOPEU/Babereki claims channel promptly. Ask for the current claim form, notification and submission deadlines, document checklist, claimant requirements and claim reference." },
            { h: "Documents commonly requested", b: "Depending on policy and circumstances, a claim may require a completed form, official death certificate or accepted proof of death, identity documents for the deceased and claimant, proof of relationship or dependency, policy details and payment instructions. Follow the insurer’s current checklist." },
            { h: "Track the claim", b: "Record when the claim was reported, documents submitted, receiving office and claim reference. If a document is unavailable or a deadline is at risk, contact the claims team immediately and ask for written guidance." }
        ],
        memberActions: [
            "Confirm who is listed as covered in the current policy.",
            "Keep official claims contacts available to your family.",
            "Ask for the latest approved claim deadlines and document checklist.",
            "Submit documents through verified secure channels and retain a receipt or reference."
        ]
    },
    {
        id: "financial-support",
        title: "Financial Support When Life Takes an Unexpected Turn",
        teaser: "Savings, credit and assistance for life’s difficult moments.",
        date: "September 2026",
        category: "Financial Wellbeing",
        tag: "Finance",
        cover: "Assets/timeline_feed_images/Emergency_Funds_Available-Union-Loan-Scheme.png",
        paragraphs: [
            "Find out about available savings, credit and assistance routes, and compare the full cost and repayment obligations before taking a loan.",
            "Unexpected expenses such as urgent travel, essential repairs or a family emergency can pressure a household budget. BOPEU-related financial services may provide options for eligible members, but every product has its own assessment process, terms and limits. Borrow only after understanding the full cost."
        ],
        sections: [
            { h: "Babereki SACCOS savings and credit", b: "A savings and credit cooperative can help members build a savings habit and may provide credit under its rules. Ask about membership, minimum savings, withdrawal conditions, loan eligibility, interest or charges, guarantors and repayment terms." },
            { h: "Emergency lending", b: "Confirm current loan amounts, eligibility, required documents, interest rate and fees, repayment period, repayment method and whether approval times are estimates or service commitments. A stated turnaround is not a guarantee of approval or disbursement." },
            { h: "Affordability before applying", b: "Compare instalments with take-home pay after essential expenses and existing deductions. Ask for the total amount repayable, not only the monthly instalment. Consider whether repayments remain manageable if overtime or variable income changes." },
            { h: "Avoid unverified offers and scams", b: "Use contact details published in the verified BOPEU app or official channels. Do not pay unofficial release fees or share a PIN, password or security code." },
            { h: "If you already have a loan", b: "Check your statement and payslip for deductions, record discrepancies and contact the provider through an official channel. Ask for a written balance and repayment schedule; seek help early if repayment becomes difficult." }
        ],
        memberActions: [
            "Read current product terms and eligibility criteria.",
            "Request a written quotation or repayment schedule before accepting credit.",
            "Keep your application reference and official receipts.",
            "Never share mobile-money PINs, banking passwords or security codes."
        ]
    },
    {
        id: "educational-bursary",
        title: "Educational Bursary — Interest-Free Support",
        teaser: "Support your studies, skills and long-term career development.",
        date: "September 2026",
        category: "Education & Development",
        tag: "Bursary",
        cover: "Assets/timeline_feed_images/educational_bursaries.webp",
        paragraphs: [
            "Learn how educational assistance may support eligible study costs, what evidence to prepare and how decisions are communicated.",
            "Education and professional development can strengthen a member’s career and the public services communities rely on. Where BOPEU or a related scheme offers educational assistance, use the published application rules to understand eligibility, covered expenses and assessment processes."
        ],
        sections: [
            { h: "What expenses might be considered?", b: "Depending on the approved scheme, eligible costs may include tuition, required study materials, books, study accommodation or academic research. The scheme rules determine coverage; some personal or retrospective expenses may be excluded." },
            { h: "Who can apply?", b: "Eligibility may depend on membership status, good standing, course or institution, academic progress, available funding and the purpose of the application. Check the current call for applications." },
            { h: "Prepare a complete application", b: "Common evidence may include an application form, proof of admission or registration, fee statement or quotation, course details, academic records where required, and proof of identity or membership. Follow the current checklist and secure upload route." },
            { h: "Understand amount and conditions", b: "A published maximum—such as P30,000 in the supplied draft description—is not an automatic award. Approved rules determine the maximum, expenses, assessment criteria, payment method and any reporting or repayment conditions." },
            { h: "Track your application", b: "Save the submission confirmation and reference. Check whether the application is received, awaiting documents, under review, approved, declined or awaiting disbursement. Respond to requests by the stated deadline." }
        ],
        memberActions: [
            "Read the current bursary notice and confirm the application window.",
            "Gather only documents requested in the official checklist.",
            "Submit through the approved channel and save your reference.",
            "Do not assume funding is approved until you receive formal written confirmation."
        ]
    },
    {
        id: "lifestyle-shopping",
        title: "Lifestyle & Shopping Discounts",
        teaser: "Make your membership work harder in everyday life.",
        date: "September 2026",
        category: "Member Benefits",
        tag: "Shopping",
        cover: "Assets/timeline_feed_images/lifestyle_discounts_at_selected_retailers_and_hotels.webp",
        paragraphs: [
            "Discover selected partner offers for shopping, health, wellness, accommodation, travel, hardware and automotive services.",
            "Participating partner offers can help eligible members save on selected goods and services, provided the offer is active and the purchase meets its conditions. The app should display actual terms so members can check the value before travelling or spending."
        ],
        sections: [
            { h: "Where offers may be available", b: "Depending on active agreements, offers may include selected supermarkets and clothing retailers, health and wellness providers, hotels, travel services, hardware suppliers or automotive businesses. Availability varies by partner, branch, product and date." },
            { h: "Check the real saving", b: "The supplied brief mentions discounts of up to 10% at selected retailers. “Up to” is a maximum, not a universal discount. Check eligible items, sale-item exclusions, stacking rules and any spending limit." },
            { h: "How to redeem", b: "Open the partner listing, check validity dates and redemption instructions, then present your digital membership card or required proof before payment. Ask the partner to confirm the discount before completing the purchase." },
            { h: "Keep offer details current", b: "Offers can change or expire. If a listing is outdated or a branch refuses a published benefit, keep the receipt and report the issue through official BOPEU feedback channels." }
        ],
        memberActions: [
            "Browse the live partner directory before making a trip.",
            "Check the exact branch, exclusions, dates and redemption steps.",
            "Present your membership card before payment and review the receipt.",
            "Report incorrect or expired offers through the app."
        ]
    },
    {
        id: "utilities-connectivity",
        title: "Utilities & Connectivity",
        teaser: "Airtime schemes, building materials and partner-based savings.",
        date: "September 2026",
        category: "Everyday Savings",
        tag: "Connectivity",
        cover: "Assets/timeline_feed_images/utilities_airtime_and_building_materia_schemes.webp",
        paragraphs: [
            "Explore approved connectivity, building-material and essential-service schemes intended to help members manage everyday costs and home projects.",
            "Connectivity and home-building expenses are important parts of everyday life in Botswana. Where active agreements exist, members may be able to access selected mobile services, airtime arrangements, building-material offers or other partner benefits through the app."
        ],
        sections: [
            { h: "Airtime and mobile services", b: "Telecommunications offers may differ by provider, plan, eligibility, SIM type, contract length and coverage. Confirm current price, bundle allowance, validity period, activation requirements, recurring charges and cancellation process." },
            { h: "Building materials and home projects", b: "A scheme may help members access selected products or payment arrangements, subject to partner stock, pricing, delivery areas and credit conditions. Ask for an itemised quotation, delivery costs, return policy and written payment terms." },
            { h: "Other utility offers", b: "Each listing should identify the provider, eligible members, product or service, offer dates, exclusions, contact details and support route. Offers can be added or withdrawn." },
            { h: "Protect your information", b: "Apply only through verified channels. Never share mobile-money PINs, online-banking credentials or security codes. Check payroll deductions or recurring payments against the written agreement and payslip." }
        ],
        memberActions: [
            "Review the exact offer and provider before applying.",
            "Ask for written pricing and recurring deduction details.",
            "Confirm delivery, activation and cancellation terms.",
            "Report a deduction or activation that does not match the agreement."
        ]
    },
    {
        id: "funeral-cover",
        title: "BOPEU Funeral Cover",
        teaser: "Group funeral protection for eligible members and their families.",
        date: "September 2026",
        category: "Insurance & Family",
        tag: "Insurance",
        cover: "Assets/timeline_feed_images/insurance_bopeu_funeral_cover.webp",
        paragraphs: [
            "Understand the group funeral cover described in BOPEU materials, how payroll deductions may work and what to check in the current policy.",
            "The supplied brief describes a group funeral arrangement underwritten by Metropolitan Life and a premium linked to basic salary, subject to a stated monthly minimum and cap. Verify the current policy schedule and payslip deductions because product terms and payroll arrangements can change."
        ],
        sections: [
            { h: "Underwriter and policy documents", b: "The supplied description names Metropolitan Life as the underwriter. Confirm the current insurer, policy or group scheme reference, policyholder, effective date and latest member-facing policy wording with BOPEU/Babereki." },
            { h: "Premium and payroll deduction", b: "The supplied brief describes a contribution of 1% of basic salary, with a minimum of P39.90 and maximum of P100 per month. Treat these as draft figures until confirmed against the current approved schedule. Check separate compulsory fees or group-life deductions and do not combine lines unless the official schedule says to." },
            { h: "Who is included?", b: "The supplied description refers to the member, spouse and children under 21. Confirm eligibility definitions, waiting periods, exclusions, extensions and benefit amounts from the current policy wording and member cover schedule." },
            { h: "Claims and settlement", b: "Notify the official claims channel promptly and request the current form, document checklist, claim deadlines and reference number. Settlement depends on policy terms, complete documents, verification and insurer assessment." },
            { h: "If the deduction looks wrong", b: "Compare payslip lines with the approved contribution schedule and ask BOPEU/Babereki for reconciliation. Keep payslips and written responses. If your employment status or payroll office changes, ask whether the deduction instruction and cover status need revalidation." }
        ],
        memberActions: [
            "Read the latest approved funeral policy summary.",
            "Confirm covered dependants and the contribution on your payslip.",
            "Keep official claims contacts available to your family.",
            "Ask for written clarification of unexplained deductions or cover-status issues."
        ]
    },
    {
        id: "emergency-loan",
        title: "Emergency Loan & Financial Assistance",
        teaser: "A possible short-term option when urgent expenses arise.",
        date: "September 2026",
        category: "Financial Wellbeing",
        tag: "Finance",
        cover: "Assets/timeline_feed_images/finance_financial_assistance.webp",
        paragraphs: [
            "Review the emergency-loan range described in the supplied brief and verify current eligibility, costs and approval timelines before applying.",
            "An urgent medical expense, essential repair or unexpected family cost can pressure a household budget. The supplied brief describes a BOPEU in-house emergency loan, but members should verify current terms before applying. Credit is a commitment: an application may be declined, and an indicative processing time does not guarantee approval or payment."
        ],
        sections: [
            { h: "Loan amount and term in the supplied brief", b: "The source brief describes a range of P2,001 to P20,000, repayment over up to 24 months and a stated 48-hour approval turnaround. Treat these as unverified draft details until BOPEU publishes current approved terms. Confirm whether any timeframe refers to review, approval or disbursement." },
            { h: "Check the full cost", b: "Request the interest rate, all fees, total amount repayable, repayment schedule, late-payment consequences and early-settlement rules in writing. Compare the instalment with take-home pay after existing deductions and essential expenses." },
            { h: "Prepare the application", b: "Use the official checklist. Depending on the product, this may include proof of identity, membership status, payslip or income evidence, payout details and consent to verify information. Submit financial information only through approved secure processes." },
            { h: "After applying", b: "Save the application reference and monitor its status. Respond to requests through official channels. Do not pay unofficial fees to an individual promising approval, and never share a PIN or security code." },
            { h: "If repayment becomes difficult", b: "Contact the lender promptly and ask what options are available under the agreement. Keep written records and avoid taking additional high-cost credit without understanding the consequences." }
        ],
        memberActions: [
            "Confirm current approved loan amount, term, rates and fees.",
            "Request a written repayment schedule and total repayment figure.",
            "Use the official application channel and save your reference.",
            "Never treat 48 hours as guaranteed approval or disbursement."
        ]
    },
    {
        id: "babereki-saccos",
        title: "Babereki SACCOS — Savings & Credit",
        teaser: "Cooperative savings and credit solutions for BOPEU members.",
        date: "September 2026",
        category: "Financial Wellbeing",
        tag: "Savings",
        cover: "Assets/timeline_feed_images/finance_access_to_babareki_saccos.webp",
        paragraphs: [
            "Learn how cooperative savings and credit may support financial planning, and what to ask before joining or applying for credit.",
            "Savings can create a buffer for planned expenses and unexpected events. A savings and credit cooperative may give eligible members a structured way to save and, subject to its rules, apply for credit. Understand the cooperative’s membership rules and product terms before making financial decisions."
        ],
        sections: [
            { h: "Build a savings habit", b: "Choose a realistic amount and ask how contributions are recorded, when savings can be withdrawn, whether notice is required, and whether any balance is restricted or pledged against a loan. Keep statements and check transactions regularly." },
            { h: "Understand membership", b: "Ask about eligibility, joining requirements, member rights and responsibilities, share capital if applicable, account fees, governance, complaint routes and how to update personal details. Read current member rules and fee schedules." },
            { h: "Credit and loan eligibility", b: "Access to credit is not automatic. It may depend on membership duration, savings history, affordability, guarantors, outstanding obligations and lending policy. Obtain a written offer with rate, fees, instalments, total repayment and consequences of missed payments." },
            { h: "Statements and reconciliation", b: "Review your SACCOS statement and payroll deductions. If a payment is missing or a balance does not match, contact the official channel and provide date, amount and reference—never send your password or PIN." },
            { h: "Plan for long-term security", b: "Savings work best with a budget and realistic goals. Keep emergency funds separate from money committed to loan repayments and avoid borrowing more than you can comfortably repay." }
        ],
        memberActions: [
            "Request the current SACCOS membership guide and fee schedule.",
            "Set a savings target that fits your budget.",
            "Read loan terms and ask for a written total repayment amount.",
            "Check statements and report discrepancies through official channels."
        ]
    }
];

/* =====================================================
   6. MOCK MEMBERS (admin + login demo data)
   ===================================================== */
window.BOPEU_MOCK_MEMBERS = [
    { name: "Kabelo Modise", omang: "090000111", memberNo: "BOPEU-37K-1001", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Transport & Public Works", employerId: "mptw", departmentId: "roads", jobTitle: "Roads Maintenance Worker", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 4200, joined: "2023-04-10" },
    { name: "Kelebogile Moseki", omang: "090000222", memberNo: "BOPEU-37K-1002", sector: "local_council", sectorLabel: "Local Authority", employer: "Gaborone City Council", employerId: "gcc", departmentId: "public_health", jobTitle: "Refuse Collector / Loader", district: "Gaborone", office: "Gaborone", status: "pending_verification", basicSalary: 3100, joined: "2026-02-01" },
    { name: "Tumelo Rantao", omang: "090000333", memberNo: "BOPEU-37K-1003", sector: "land_board", sectorLabel: "Land Board", employer: "Malete Land Board", employerId: "mlb", departmentId: "allocation", jobTitle: "Land Board Field Assistant", district: "South East", office: "Gaborone", status: "active", basicSalary: 3600, joined: "2022-11-03" },
    { name: "Boitumelo Lesego", omang: "090000444", memberNo: "BOPEU-37K-1004", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Water Utilities Corporation (WUC)", employerId: "wuc", departmentId: "utilities", jobTitle: "Meter Reader", district: "Ngamiland", office: "Maun", status: "active", basicSalary: 5100, joined: "2021-07-12" },
    { name: "Olorato Keaikitse", omang: "090000555", memberNo: "BOPEU-37K-1005", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Health", employerId: "moh", departmentId: "hospitals", jobTitle: "Hospital Orderly", district: "Central District", office: "Palapye", status: "pending_verification", basicSalary: 2900, joined: "2026-03-15" },
    { name: "Moakofi Sethunya", omang: "090000666", memberNo: "BOPEU-37K-1006", sector: "local_council", sectorLabel: "Local Authority", employer: "Francistown City Council", employerId: "fcc", departmentId: "public_health", jobTitle: "Street Cleaner", district: "Francistown", office: "Francistown", status: "active", basicSalary: 2700, joined: "2020-01-20" },
    { name: "Lebogang Mokgakane", omang: "090000777", memberNo: "BOPEU-37K-1007", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Botswana Power Corporation (BPC)", employerId: "bpc", departmentId: "utilities", jobTitle: "Electrical Line Assistant", district: "Gaborone", office: "Gaborone", status: "active", basicSalary: 5800, joined: "2019-09-01" },
    { name: "Refilwe Raditladi", omang: "090000888", memberNo: "BOPEU-37K-1008", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Education & Skills Development", employerId: "moes", departmentId: "schools", jobTitle: "General Maintenance Worker", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 3400, joined: "2022-05-18" },
    { name: "Kagiso Molapisi", omang: "090000999", memberNo: "BOPEU-37K-1009", sector: "land_board", sectorLabel: "Land Board", employer: "Ngwato Land Board", employerId: "nlb", departmentId: "ops", jobTitle: "Records Assistant", district: "Central District", office: "Palapye", status: "pending_verification", basicSalary: 3300, joined: "2026-01-25" },
    { name: "Oratile Sekhute", omang: "090001000", memberNo: "BOPEU-37K-1010", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "BotswanaPost", employerId: "bpost", departmentId: "logistics", jobTitle: "Postal Courier", district: "Ngamiland", office: "Maun", status: "active", basicSalary: 3000, joined: "2021-03-09" },
    { name: "Aobakwe Sebina", omang: "090001111", memberNo: "BOPEU-37K-1011", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Agriculture", employerId: "moa", departmentId: "field_offices", jobTitle: "Field Assistant", district: "Ngwaketse", office: "Kang", status: "active", basicSalary: 3200, joined: "2018-08-05" },
    { name: "Gontse Wale", omang: "090001222", memberNo: "BOPEU-37K-1012", sector: "local_council", sectorLabel: "Local Authority", employer: "Kweneng District Council", employerId: "kdc", departmentId: "civil", jobTitle: "Maintenance Technician", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 3800, joined: "2020-06-15" }
];

/* =====================================================
   7. FUNERAL COVER RULES (Metropolitan Life)
   Subscription = 1% of basic salary capped P39.90 - P100.00
   Core cover P60,000 for member, spouse and children under 21.
   12-month premium waiver on death of a member.
   ===================================================== */
window.BOPEU_FUNERAL = {
    currency: "BWP",
    subscriptionRate: 0.01,
    subscriptionMin: 39.90,
    subscriptionMax: 100.00,
    coreCover: "P 60,000",
    childBrackets: [
        { key: 'Child 16-21', minAge: 16, maxAge: 21, cover: 'P 60,000' },
        { key: 'Child 7-15', minAge: 7, maxAge: 15, cover: 'P 30,000' },
        { key: 'Child 0-6', minAge: 0, maxAge: 6, cover: 'P 15,000' }
    ],
    spouseCover: 'P 60,000',
    parentCover: 'P 60,000',
    extendedCover: 'P 60,000',
    maxChildren: 10,
    premiumWaiverMonths: 12,
    claimWindowMonths: 6,
    docWindowMonths: 12
};

/* =====================================================
   8. AGE HELPERS
   ===================================================== */
function ageFromDob(dob) {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age;
}

function ageBandFromDob(dob) {
    const age = ageFromDob(dob);
    if (age === null) return 'low';
    if (age <= 40) return 'low';
    if (age <= 75) return 'mid';
    return 'high';
}

function childBracketFromDob(dob) {
    const age = ageFromDob(dob);
    if (age === null || age < 0 || age > 21) return null;
    return BOPEU_FUNERAL.childBrackets.find(b => age >= b.minAge && age <= b.maxAge) || null;
}

function childBracketFromKey(key) {
    if (!key || key.indexOf('Child') !== 0) return null;
    return BOPEU_FUNERAL.childBrackets.find(b => b.key === key) || null;
}

function childBracketFor(relation, dob) {
    const byKey = childBracketFromKey(relation);
    if (byKey) return byKey;
    return relation && relation.indexOf('Child') === 0 ? childBracketFromDob(dob) : null;
}

function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

/* Funeral cover: benefit by relation/age */
function familyMemberCover(relation, dob) {
    const fr = BOPEU_FUNERAL;
    if (relation === 'Spouse') return fr.spouseCover;
    if (relation === 'Parent / Extended') return fr.extendedCover;
    if (relation && relation.indexOf('Child') === 0) {
        const bracket = childBracketFor(relation, dob);
        return bracket ? bracket.cover : 'P 15,000';
    }
    return fr.spouseCover;
}

/* Subscription: 1% of basic salary capped P39.90 - P100.00 */
function funeralSubscription(basicSalary) {
    const fr = BOPEU_FUNERAL;
    const calc = (typeof basicSalary === 'number' && basicSalary > 0) ? basicSalary * fr.subscriptionRate : fr.subscriptionMin;
    return Math.min(Math.max(calc, fr.subscriptionMin), fr.subscriptionMax);
}

function computeFuneralTotals(basicSalary, family) {
    const sub = funeralSubscription(basicSalary);
    return {
        subscription: sub,
        coreCover: BOPEU_FUNERAL.coreCover,
        coveredMembers: (family || []).length + 1,
        total: sub
    };
}

/* =====================================================
   9. BENEFIT PARTNERS (discount verification)
   ===================================================== */
const BOPEU_PARTNER_LOGO = 'Assets/logo/partners/';
window.BOPEU_BENEFIT_PARTNERS = [
    { id: "absa", name: "Absa Bank Botswana", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "absa_logo.webp", discount: "Banking products & lending", detail: "Absa Bank Botswana provides retail, corporate and investment banking across a nationwide branch and ATM network. Member-relevant service areas include savings and current accounts, personal loans, mortgages, corporate finance and digital banking. A BOPEU-specific price, fee waiver or discount is not yet published.", how: "Ask at any Absa branch or contact your nearest BOPEU office. No BOPEU member rate is published yet, so confirm current terms at enquiry.", icon: "A", status: "coming", statusLabel: "Terms to Confirm", validity: "Partner service confirmed; BOPEU member terms to be confirmed", lastVerified: "22 Sep 2026" },
    { id: "access_bank", name: "Access Bank Botswana", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "access_bank_logo.webp", discount: "Personal, vehicle & mortgage lending", detail: "BOPEU-linked lending revised effective 1 March 2026. Personal loans P10,000–P700,000 up to 96 months; vehicle loans up to P1,200,000 (up to 72–84 months, 0% deposit for vehicles below P500,000 per a September 2026 Babereki notice); mortgages up to P3,000,000 / 360 months with up to 90% financing of the property's open market value. A promotional personal-loan rate was advertised until 15 December 2026. Credit is subject to affordability.", how: "Visit an Access Bank branch, or WhatsApp \u201cpayslip\u201d to +267 75 750 701 / +267 73 240 284.", icon: "AB", status: "verified", statusLabel: "Confirmed 2026", validity: "Scheme effective 1 Mar 2026 \u00b7 promo personal-loan rate to 15 Dec 2026", terms: "Terms & Conditions apply. Credit is subject to affordability assessment.", lastVerified: "22 Sep 2026" },
    { id: "acudetox", name: "AcuDetox Clinic", sector: "Health", category: "Health & Wellness", logo: BOPEU_PARTNER_LOGO + "acudetox_clinic_logo.webp", discount: "Acupuncture & holistic wellness", detail: "Acupuncture detoxification, holistic therapy and body-wellness treatments. Announced with Diagnofirm in February 2026 as an exclusive BOPEU health benefit. A current numeric member discount or service package is not yet published.", how: "Current member consultation/treatment discount to be confirmed with the clinic.", icon: "AD", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "archein", name: "Archein Hardware", sector: "Hardware", category: "Building Materials / Home Ownership", logo: BOPEU_PARTNER_LOGO + "archein_hardware_logo.webp", discount: "Up to P200,000 material credit", detail: "Home-ownership building-material scheme with subsidised materials, project-related credit and nationwide delivery. No deposit, 4% monthly interest on the reducing balance, repay up to 36 months, and free delivery on material values above P100,000. Coverage includes Phakalane, Tsabong, Letlhakane, Maun, Gumare and Shakwe.", how: "Apply by telephone, email or WhatsApp \u2014 316 2335 / 74906982.", icon: "AH", status: "verified", statusLabel: "Confirmed 2026", validity: "Ongoing until changed", terms: "Credit is a subsidised scheme, not a retail coupon \u2014 approval is subject to scheme requirements and affordability.", lastVerified: "22 Sep 2026" },
    { id: "builders_world", name: "Builders World", sector: "Hardware", category: "Hardware / Building Materials", logo: BOPEU_PARTNER_LOGO + "builders_world_logo.webp", discount: "Home-improvement materials", detail: "Home-improvement and building-material retailer operating across Botswana \u2014 cement, timber, roofing, tiles, sanitaryware, electrical supplies and hardware tools. BOPEU's general benefits page lists reduced pricing on building materials; a Builders World-specific percentage, credit limit or delivery rule is not yet published.", how: "Member price list / scheme to be confirmed with the partner.", icon: "BW", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "cresta_hotels", name: "Cresta Hotels", sector: "Travel", category: "Hospitality & Accommodation", logo: BOPEU_PARTNER_LOGO + "cresta_hotels_logo.webp", discount: "Special member accommodation rates", detail: "Botswana-wide hospitality group offering accommodation, conferences, restaurants and event hosting. Properties include Cresta Lodge Gaborone, Cresta Maun Hotel, Cresta Marang Gardens (Francistown) and Cresta Mahalapye. BOPEU members are offered special member rates at participating hotels; the Cresta-specific rate is not yet published.", how: "Member card may be required; specific rate and booking channel to be confirmed.", icon: "CH", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "diagnofirm", name: "Diagnofirm Medical Laboratories", sector: "Health", category: "Healthcare & Diagnostics", logo: BOPEU_PARTNER_LOGO + "diagnofirm_logo.webp", discount: "No 10% patient share \u00b7 up to 35% off", detail: "Exclusive health & fitness discounts for BOPEU members. No 10% patient share and up to 35% off for members without medical aid. Additional listed savings: Virgin Active 10% off and Penalty Box 15% off. Services include pathology, microbiology, molecular testing and health screenings.", how: "Carry your valid BOPEU membership card for verification at the laboratory.", icon: "D", status: "verified", statusLabel: "Confirmed 2026", validity: "Ongoing until changed", lastVerified: "22 Sep 2026" },
    { id: "drillonic", name: "Drillonic Water Development", sector: "Hardware", category: "Water Development / Boreholes", logo: BOPEU_PARTNER_LOGO + "drillonic_borehole_drilling_logo.webp", discount: "Borehole drilling & surveys", detail: "Water-development services for domestic, agricultural and industrial projects \u2014 hydrogeological surveys, underground-water exploration, borehole drilling, pump installation and yield testing. No BOPEU member discount, credit arrangement or installation concession is yet published.", how: "Member rate to be confirmed with the partner.", icon: "DW", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "first_capital_bank", name: "First Capital Bank", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "first_capital_bank_logo.webp", discount: "Babereki + FCB facility up to P200,000", detail: "Babereki Investments + First Capital Bank loan facility available to BOPEU members. Access up to P200,000 and repay up to 60 months. Qualifying third-party loans with other financial institutions may be cleared within the approved limit. September 2026 Babereki notices confirm the facility.", how: "Call or WhatsApp 316 2335, or visit your nearest BOPEU office.", icon: "FCB", status: "verified", statusLabel: "Confirmed 2026", validity: "September 2026 facility \u2014 current terms apply", terms: "Terms & Conditions apply; eligibility and interest rate to be confirmed at application.", lastVerified: "22 Sep 2026" },
    { id: "hollard", name: "Hollard", sector: "Insurance", category: "Insurance", logo: BOPEU_PARTNER_LOGO + "hollard_logo.webp", discount: "Life & short-term insurance", detail: "Life and short-term insurance including funeral, motor, home and commercial asset cover. A BOPEU/Babereki\u2013Hollard joint venture was announced in 2015 as a five-year arrangement, so those terms must not be treated as active 2026 member pricing without current BOPEU confirmation. Confirm the current agreement, product list and member pricing.", how: "Confirm the current partner agreement through Babereki Insurance Brokers.", icon: "H", status: "coming", statusLabel: "Terms to Verify", validity: "2015 JV terms historical \u2014 current 2026 pricing to verify", lastVerified: "22 Sep 2026" },
    { id: "majestic_five_hotel", name: "Majestic Five Hotel", sector: "Travel", category: "Hospitality & Accommodation", logo: BOPEU_PARTNER_LOGO + "majestic_five_hotel_logo.webp", discount: "Accommodation & conferences", detail: "Four-star property in Palapye with rooms and suites, conference halls, swimming pool, restaurant and bar. BOPEU uses the hotel as a venue for major union meetings and congresses. A current member accommodation discount or rate is not yet published.", how: "Member accommodation rate and booking/verification process to be confirmed.", icon: "M5", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "mascom", name: "Mascom", sector: "Telecom", category: "Telecommunications / Mobile Money", logo: BOPEU_PARTNER_LOGO + "mascom_logo.webp", discount: "Voice, data & MyZaka", detail: "Mobile voice and data, MyZaka mobile money, fibre internet and enterprise services. A historic BOPEU airtime contract with Mascom and Orange documented monthly salary deductions of P65\u2013P400 over two years; those amounts are historical and require current confirmation before being presented as 2026 terms.", how: "Current 2026 airtime bands and contract terms to be confirmed with Mascom/Babereki.", icon: "M", status: "coming", statusLabel: "Terms to Verify", validity: "Historical scheme \u2014 current 2026 terms to verify", lastVerified: "22 Sep 2026" },
    { id: "old_mutual", name: "Old Mutual", sector: "Insurance", category: "Insurance / Savings / Investments", logo: BOPEU_PARTNER_LOGO + "old_mutual_logo.webp", discount: "Household, car & business insurance", detail: "A BOPEU/Babereki + Old Mutual collaboration offers insurance cover for household contents, gadgets, cars and businesses, alongside long-term savings, investment, wealth management, unit trusts, life insurance and retirement planning. The scheme was re-launched in 2022; current 2026 member premiums and discounts need confirmation.", how: "Adjust cover via Babereki Insurance Brokers; current pricing to confirm.", icon: "OM", status: "coming", statusLabel: "Pricing to Verify", validity: "Scheme documented 2022 \u2014 current 2026 pricing to verify", lastVerified: "22 Sep 2026" },
    { id: "orange", name: "Orange Botswana", sector: "Telecom", category: "Telecommunications / Mobile Money", logo: BOPEU_PARTNER_LOGO + "orange_logo.webp", discount: "Voice, data & Orange Money", detail: "Prepaid and postpaid plans, Orange Money, home fibre, cloud and business connectivity. A historic BOPEU airtime salary-deduction arrangement with Mascom, Orange and beMobile documented P65\u2013P400 monthly bands over two years; the current 2026 individual terms require confirmation.", how: "Current 2026 airtime terms and bundles to be confirmed with Orange/Babereki.", icon: "O", status: "coming", statusLabel: "Terms to Verify", validity: "Historical scheme \u2014 current 2026 terms to verify", lastVerified: "22 Sep 2026" },
    { id: "royal_dental_clinic", name: "Royal Dental Clinic", sector: "Health", category: "Dental Care", logo: BOPEU_PARTNER_LOGO + "royal_dental_clinic_logo.webp", discount: "Dental care", detail: "Private dental practice in the Grand Union Building, Gaborone, providing general consultations, cleanings, restorative dentistry and cosmetic procedures. No current BOPEU-specific dental discount or treatment package is yet published.", how: "Member discount / treatment package and booking verification to be confirmed.", icon: "RD", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "village_medical_day_care_centre", name: "Village Medical Day Care Centre", sector: "Health", category: "Medical / Day Care", logo: BOPEU_PARTNER_LOGO + "village_medical_day_care_centre_logo.webp", discount: "Day procedures & consultations", detail: "Day procedures, medical consultations and access to diagnostic imaging facilities in the Village precinct. No current BOPEU-specific rate or service entitlement is yet published; confirm the exact legal/business name and address before publishing.", how: "Member rate / service entitlement to be confirmed with the centre.", icon: "VM", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" }
];

/* =====================================================
   10. WORKER EDUCATION QUIZ
   ===================================================== */
window.BOPEU_QUIZ = [
    { q: "When was BOPEU founded?", options: ["1995", "2001", "2007", "2012"], answer: 2 },
    { q: "Who can join BOPEU?", options: ["Only central government workers", "All eligible public sector employees", "Private sector only", "Students"], answer: 1 },
    { q: "The BOPEU Educational Bursary maximum loan is:", options: ["P 10,000", "P 20,000", "P 30,000", "P 50,000"], answer: 2 },
    { q: "Bursary funds are provided at what interest rate?", options: ["8%", "4%", "2%", "0% (interest-free)"], answer: 3 },
    { q: "Funeral cover subscription equals:", options: ["P 100 flat", "1% of basic salary (capped P39.90-P100)", "5% of salary", "P 30 per month"], answer: 1 },
    { q: "BOPEU members can get up to ___ off at Diagnofirm without medical aid.", options: ["10%", "20%", "35%", "50%"], answer: 2 },
    { q: "The Archein building materials scheme offers up to:", options: ["P 100,000", "P 200,000", "P 500,000", "P 1,000,000"], answer: 1 },
    { q: "BOPEU's head office is located in:", options: ["Francistown", "Maun", "Gaborone CBD", "Palapye"], answer: 2 }
];

/* =====================================================
   11. FAQ / KNOWLEDGE BASE (Menu tab)
   ===================================================== */
window.BOPEU_FAQ = [
    {
        cat: "Membership & Eligibility",
        items: [
            {
                q: "What is BOPEU?",
                a: "It is a registered trade union in Botswana originally founded in 2007 (evolving from the Botswana Civil Servants Association) that serves as a bargaining agent protecting the welfare of public and parastatal employees."
            },
            {
                q: "Who can join BOPEU?",
                a: "Any employee of the Government of the Republic of Botswana or parastatal organizations where the government has a financial interest (such as WUC, BOBS, BMC, and BTO)."
            },
            {
                q: "Which parastatals does BOPEU recruit from?",
                a: "They organize workers across several key entities, including the Water Utilities Corporation (WUC), Botswana Bureau of Standards (BOBS), Botswana Meat Commission (BMC), and the Botswana Tourism Organisation (BTO)."
            }
        ]
    },
    {
        cat: "Workplace Representation & Legal Rights",
        items: [
            {
                q: "How does BOPEU assist with workplace disputes?",
                a: "The union provides free legal representation, dispute resolution, grievance management, and collective bargaining to protect your terms of service."
            },
            {
                q: "Does BOPEU handle individual cases?",
                a: "Yes. BOPEU is one of the few trade unions in Botswana that manages individual employee grievances and disciplinary disputes free of charge."
            }
        ]
    },
    {
        cat: "Financial & Fringe Benefits",
        items: [
            {
                q: "What financial assistance programs are available?",
                a: "Members have access to low-interest microloans (short-term loans) at a 2% interest rate, commercial bank loan partnerships (with Access Bank and ABSA), and the Babereki SACCOS savings and investment scheme."
            },
            {
                q: "Are there any lifestyle or shopping discounts?",
                a: "Yes. Members receive up to 10% off at selected supermarkets, retail shops, and hardware stores (such as Sefalana, Motovac, and Cresta hotels)."
            },
            {
                q: "Does BOPEU offer educational support?",
                a: "Yes, the union runs a dedicated Bursary Scheme to financially assist eligible members with educational advancement."
            }
        ]
    },
    {
        cat: "Insurance & Funeral Cover",
        items: [
            {
                q: "How does the BOPEU Group Funeral Cover work?",
                a: "The scheme provides a core benefit of P60,000 for the main member and spouse. It requires a subscription fee of 1% of your basic salary (capped between P39.90 and P100.00) and includes a 12-month premium waiver."
            },
            {
                q: "How can I manage my insurance policies or file claims?",
                a: "Members can use the digital Babereki Insurance Brokers Portal to complete self-service registrations, amend family details, and submit claims online."
            }
        ]
    }
];