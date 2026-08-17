---
title: "Why I built ATO Lens: A local-first Australian tax analyzer"
date: 2026-08-17 00:00:00 +1000
tags:
- Developer Tools
- Local-First
- Open Source
- Tax
- Electron
description: Notes on building ATO Lens, an open-source, local-first desktop and web app for exploring Australian tax history, super contributions, and HECS repayments without uploading sensitive financial data to the cloud.
---

Every year around July in Australia, tax time triggers the same routine: log into myGov, download a handful of cryptic PDFs from the Australian Taxation Office (ATO)—Notices of Assessment, PAYG income statements, Super guarantee summaries, and HECS/HELP balances—and try to piece together where your money actually went.

Over a few years of working as an employee, contractor, or founder, those PDFs pile up in a Downloads folder. You end up with important questions that are surprisingly difficult to answer:

- How has my effective tax rate shifted across financial years as my income changed?
- Did my previous employers actually pay the correct Superannuation Guarantee percentage on time?
- How much did HECS/HELP indexation inflate my loan balance compared to what I paid off through withholding?
- Which work-related deduction categories am I consistently claiming or overlooking?

Most third-party software that answers these questions requires uploading your entire financial life—including your Tax File Number (TFN), salary figures, employer details, and personal records—to a remote cloud server. 

For tax documents, that felt like an unacceptable privacy trade-off. I wanted a tool that gave me deep insights into my Australian tax history without sending a single byte of financial data over the internet.

So I built [ATO Lens](https://github.com/realbakari/ATO-Lens).

---

## Local-first by design

ATO Lens is built with Vite, TypeScript, and Electron. 

The core architecture follows a strict rule: all document parsing, calculations, and data storage happen locally on your machine. There are no user accounts, no backend databases, and no analytics telemetry. 

When you drop an ATO PDF or income statement into the workspace, the app parses the text and tables in the local runtime using offline rule-based extraction and OCR. Your financial data never leaves your device.

---

## What you can track and do

### 1. Multi-year tax trajectory

The app parses official ATO Notices of Assessment and income statements to chart your income, tax withheld, Medicare levy, offsets, and actual refunds or liabilities across financial years. Seeing your effective tax rate over a multi-year timeline makes it clear how salary jumps or deduction changes affected your real take-home pay.

### 2. Guided myTax preparation copilot

In version 1.1, I added a guided preparation copilot that aligns directly with official ATO myTax field labels. It checks your numbers, flags missing deduction categories, and verifies tax-readiness before you start filling out your annual return.

### 3. Local OCR for receipts and scanned papers

Not everything arrives as a clean digital PDF. ATO Lens includes on-device OCR that automatically detects and extracts text from 11 Australian document types—including photographed physical receipts, dividend statements, sole-trader invoices, PAYG summaries, and super statements (supporting PDF, JPEG, PNG, and WebP).

Each extracted field shows page-level provenance and confidence scores, giving you a review step before anything is imported into your workspace.

### 4. Super guarantee and HECS compliance

- **Superannuation Guarantee**: Calculates whether your employer paid the mandatory percentage (from 9.5% up to 11.5%) on time into your nominated super fund.
- **HECS / HELP Loans**: Separates compulsory withholdings from indexation increases, showing whether your balance actually decreased.

### 5. Tax preparation pack export

When you finish reviewing, you can export a clean, organized Preparation Pack PDF. You can keep it for your own records, use it as a cheat sheet while lodging via myTax, or hand it straight to your accountant.

### 6. Optional natural language assistant (BYOK)

For quick questions—like *"How much did I spend on self-education in 2023?"*—the built-in assistant queries your local workspace. If you want deeper conversational analysis, you can plug in your own API key (Claude, OpenAI, or Gemini) directly in settings.

---

## Try it out

The app is open source and runs as a desktop app on macOS, Windows, and Linux, or locally in your browser. 

You can grab the latest builds or explore the code on [GitHub](https://github.com/realbakari/ATO-Lens).
