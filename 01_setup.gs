/**
 * CA Firm Diagnostic — one-paste builder  (RUN ONCE)
 *
 * Creates:
 *   Leader Views — founder diagnostic (goal-first, single-goal RCA, branched)
 *   Team Opinion — anonymous staff battery (COPSOQ III core items + Edmondson-7)
 *   Workbook — response tabs + auto-scoring tabs (TeamOpinion_Scoring, Dashboard)
 *
 * Usage: paste into script.google.com -> Run -> buildDiagnostic
 * Rerun creates DUPLICATES — run once. If you must rebuild, run clearBuild_()
 * first (it also purges legacy LINKA/LINKC/PULSE keys from older versions).
 *
 * After running: follow README.md (dry-run first, then share).
 */

var ID_KEYS = {
  leaderViews: 'LEADER_VIEWS_FORM_ID',
  teamOpinion: 'TEAM_OPINION_FORM_ID',
  ss: 'WORKBOOK_ID'
};

// ------------------------------------------------- Leader Views (shared RCA)
var RCA = {
  S1: 'How is this showing up today - what\'s actually happening?',
  S2: 'What early sign would tell you this goal is starting to move, before any number shows it?',
  S3: 'What number or fact, six months from now, would prove this goal is achieved?',
  R1: 'Where could this be coming from? Select all that contribute.',
  R2: 'Why, what\'s stopping you?',
  R3: 'If only one of these could be fixed, which is the binding constraint?',
  R4: 'What backs your answer?',
  DOMAINS: ['People & skills', 'Process & standards', 'Capacity & time',
    'Client mix & pipeline', 'Tools & systems', 'Leadership & communication'],
  EVIDENCE: ['Firm numbers or records', 'Direct observation', 'My own judgment']
};

function buildDiagnostic() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty(ID_KEYS.leaderViews)) {
    Logger.log('ALREADY BUILT — stopping to avoid duplicates.');
    Logger.log('Existing Leader Views form: ' + props.getProperty(ID_KEYS.leaderViews));
    Logger.log('To rebuild, run clearBuild_() first, then buildDiagnostic().');
    return;
  }

  try {
    // ------------------------------------------------- Leader Views: founder
    var lv = FormApp.create('Leader Views');
    lv.setDescription('A 12-minute structured conversation: where the firm is going, ' +
      'the one outcome you want in the next 12 months, and what\'s really in the way. ' +
      'There are no right answers - your honest view drives the plan. ' +
      'The next section adapts to what you pick first.');
    lv.setCollectEmail(false);
    lv.setAllowResponseEdits(true);
    lv.setConfirmationMessage('Submitted. Your answers are now feeding the diagnostic - ' +
      'next step is a short review session.');

    // Page 1: vision, goal, routing (choice nav bound AFTER sections exist)
    para_(lv, 'Imagine the firm is working exactly right three years from now. ' +
      'What is true that isn\'t true today?', true);
    para_(lv, 'In the next 12 months, what ONE outcome would most change the firm ' +
      'for the better?', true);
    var destQ = mc_(lv, 'Which theme is that goal mostly about?',
      ['Growing revenue / taking on more work',
       'People - keeping good people / their motivation',
       'Succession - someone to carry the firm besides me',
       'Quality & risk - errors, review, compliance slips',
       'My own time - I am the bottleneck',
       "Not sure / it's a mix of things"], true);

    // Five RCA branches (identical 7 questions, theme-specific R3)
    var brG = buildRcaBranch_(lv, 'Growth & capacity', 'Root-cause your growth goal.',
      ['Not enough people with the right skills', 'My own time and involvement',
       'Getting clients / pipeline', 'Fear of quality slipping as we grow']);
    var brP = buildRcaBranch_(lv, 'People & motivation', 'Root-cause your people goal.',
      ['No visible career path', 'Pay below market',
       'Workload / season pressure', 'Not enough guidance or mentoring']);
    var brS = buildRcaBranch_(lv, 'Succession & continuity', 'Root-cause your continuity goal.',
      ['No one beyond me with client relationships', 'Work only I can do',
       'Nobody ready / being developed']);
    var brQ = buildRcaBranch_(lv, 'Quality & risk', 'Root-cause your quality goal.',
      ['Workload in peak season', 'Skill gaps in the team',
       'No standard processes / templates', 'Unclear who is accountable']);
    var brT = buildRcaBranch_(lv, 'Your time & delegation', 'Root-cause your time goal.',
      ['Client work only I can do', 'Firefighting and re-review',
       'People issues', 'Admin and coordination']);

    // --- "Not sure" mini-branch (choice nav bound after all sections exist)
    var brN = a0page_(lv, 'Let\'s pinpoint it', 'One question - pick what feels most stuck.');
    var pinpointQ = mc_(lv, 'Which area feels most stuck today?',
      ['Growing revenue / taking on more work',
       'People - keeping good people',
       'Succession',
       'Quality & risk',
       'My own time'], true);

    // --- Values (all branches converge here)
    var brV = a0page_(lv, 'Values', 'One question before the profile.');
    para_(lv, 'What must the firm never sacrifice to reach this goal - ' +
      'where\'s the line you won\'t cross?', true);

    // --- Firm profile (last section)
    a0page_(lv, 'Firm profile - last section', 'Seven quick facts. Type numbers.');
    txt_(lv, 'How many partners?', 'Type a number.', true);
    txt_(lv, 'Total staff (excluding partners)?', 'Type a number.', true);
    txt_(lv, 'How many are articled clerks / trainees?', 'Type a number.', true);
    txt_(lv, 'How many are CA-qualified (not partners)?', 'Type a number.', true);
    var lines = lv.addCheckboxItem();
    lines.setTitle('Service lines - select all that apply');
    lines.setChoiceValues(['Audit & assurance', 'Income tax', 'GST & indirect tax',
      'ROC & compliance', 'Advisory & other']);
    lines.setRequired(true);
    mc_(lv, 'Revenue direction, last 3 years?', ['Up', 'Flat', 'Down'], true);
    txt_(lv, 'People who left in the last 24 months (approximate)?',
      'Your best estimate - type a number.', true);

    // --- Late-bound routing: destination + pinpoint (choice-level nav).
    destQ.setChoices([
      destQ.createChoice('Growing revenue / taking on more work', brG),
      destQ.createChoice('People - keeping good people / their motivation', brP),
      destQ.createChoice('Succession - someone to carry the firm besides me', brS),
      destQ.createChoice('Quality & risk - errors, review, compliance slips', brQ),
      destQ.createChoice('My own time - I am the bottleneck', brT),
      destQ.createChoice("Not sure / it's a mix of things", brN)
    ]);
    pinpointQ.setChoices([
      pinpointQ.createChoice('Growing revenue / taking on more work', brG),
      pinpointQ.createChoice('People - keeping good people', brP),
      pinpointQ.createChoice('Succession', brS),
      pinpointQ.createChoice('Quality & risk', brQ),
      pinpointQ.createChoice('My own time', brT)
    ]);
    // Every branch section lands on Values (set on all breaks — safe under
    // either Apps Script section-nav interpretation; choice nav overrides
    // the intro/pinpoint entries).
    brG.setGoToPage(brV);
    brP.setGoToPage(brV);
    brS.setGoToPage(brV);
    brQ.setGoToPage(brV);
    brT.setGoToPage(brV);
    brN.setGoToPage(brV);

    // ------------------------------------------------- Team Opinion: staff
    var to = buildTeamOpinion_();

    // ------------------------------------------------- Workbook + destinations
    var ss = SpreadsheetApp.create('CA Firm Diagnostic - Responses');
    lv.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    to.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    bindResponseSheets(ss);
    buildScoringTabs_(ss);

    // ------------------------------------------------- Save IDs + report
    props.setProperty(ID_KEYS.leaderViews, lv.getId());
    props.setProperty(ID_KEYS.teamOpinion, to.getId());
    props.setProperty(ID_KEYS.ss, ss.getId());

    Logger.log('=== BUILD COMPLETE ===');
    Logger.log('LEADER VIEWS (send to founder): ' + lv.getPublishedUrl());
    Logger.log('LEADER VIEWS (edit form):       ' + lv.getEditUrl());
    Logger.log('TEAM OPINION (forward to team): ' + to.getPublishedUrl());
    Logger.log('TEAM OPINION (edit form):       ' + to.getEditUrl());
    Logger.log('WORKBOOK (scoring):             ' + ss.getUrl());
    Logger.log('NEXT: check workbook has tabs LeaderViews_Responses + ' +
      'TeamOpinion_Responses (if not, submit one test response to each form, ' +
      'then run bindResponseSheets again), then dry-run per 04_analysis_engine.md ' +
      'before sharing.');

  } catch (e) {
    Logger.log('BUILD ERROR: ' + e.message + (e.lineNumber ? ' (line ' + e.lineNumber + ')' : ''));
    throw e;
  }
}

/** One RCA branch: page break + the 7 shared questions (theme-specific R3). */
function buildRcaBranch_(form, title, subtitle, r3Options) {
  var br = a0page_(form, title, subtitle);
  para_(form, RCA.S1, true);
  txt_(form, RCA.S2, 'Lead sign - observable within weeks.', true);
  txt_(form, RCA.S3, 'Lag target - the proof, six months out.', true);
  var r1 = form.addCheckboxItem();
  r1.setTitle(RCA.R1);
  r1.setChoiceValues(RCA.DOMAINS);
  r1.setRequired(true);
  para_(form, RCA.R2, true);
  mc_(form, RCA.R3, r3Options, true);
  mc_(form, RCA.R4, RCA.EVIDENCE, true);
  return br;
}

/**
 * Binds the two auto-created response tabs to deterministic names.
 * Header markers make the match reliable even if Google names both tabs
 * "Form Responses *". Safe to rerun.
 */
function bindResponseSheets(ss) {
  if (!ss) {
    var id = PropertiesService.getScriptProperties().getProperty(ID_KEYS.ss);
    if (!id) { Logger.log('No workbook ID stored yet - run buildDiagnostic() first.'); return; }
    ss = SpreadsheetApp.openById(id);
  }
  Utilities.sleep(4000); // let destination sheets finish materialising
  var sheets = ss.getSheets();
  var foundLv = false, foundTo = false;
  for (var i = 0; i < sheets.length; i++) {
    var sh = sheets[i];
    var name = sh.getName();
    if (name === 'LeaderViews_Responses' || name === 'TeamOpinion_Responses') continue;
    var b1 = '';
    try { b1 = String(sh.getRange('B1').getValue()); } catch (err) { continue; }
    if (b1.indexOf('three years from now') > -1) {
      sh.setName('LeaderViews_Responses'); foundLv = true;
      Logger.log('Bound: ' + name + ' -> LeaderViews_Responses');
    } else if (b1.indexOf('not have time to complete') > -1) {
      sh.setName('TeamOpinion_Responses'); foundTo = true;
      Logger.log('Bound: ' + name + ' -> TeamOpinion_Responses');
    }
  }
  if (!foundLv || !foundTo) {
    Logger.log('WARN: response tabs not fully bound (LeaderViews:' + foundLv +
      ' TeamOpinion:' + foundTo + ').');
    Logger.log('Likely cause: headers not written yet. Submit one test response ' +
      'to each form, then run bindResponseSheets() again.');
    Logger.log('Tabs present: ' + sheets.map(function (s) { return s.getName(); }).join(', '));
  }
}

// ------------------------------------------------- Team Opinion (staff battery)

var TO = {
  FREQ: ['Always', 'Often', 'Sometimes', 'Seldom', 'Never or hardly ever'],
  EXT: ['To a very large extent', 'To a large extent', 'Somewhat',
    'To a small extent', 'To a very small extent'],
  SAT: ['Very satisfied', 'Satisfied', 'Neither/Nor', 'Unsatisfied', 'Very unsatisfied'],
  QD2: 'How often do you not have time to complete all your work tasks?',
  QD3: 'Do you get behind with your work?',
  WF2: 'Do you feel that your work drains so much of your energy that it has a negative effect on your private life?',
  WF3: 'Do you feel that your work takes so much of your time that it has a negative effect on your private life?',
  PD2: 'Do you have the possibility of learning new things through your work?',
  JS4: 'Regarding your work in general. How pleased are you with your job as a whole, everything taken into consideration?',
  SS: 'How often do you get help and support from your immediate supervisor, if needed?',
  CL1: 'Does your work have clear objectives?',
  RE1: 'Is your work recognized and appreciated by the management?',
  JU1: 'Are conflicts resolved in a fair way?',
  JU4: 'Is the work distributed fairly?',
  TMX2: 'Can the employees trust the information that comes from the management?',
  SW1: 'Is there a good atmosphere between you and your colleagues?',
  PS1: 'If you make a mistake on this team, it is often held against you.',
  PS2: 'Members of this team are able to bring up problems and tough issues.',
  PS3: 'People on this team sometimes reject others for being different.',
  PS4: 'It is safe to take a risk on this team.',
  PS5: 'It is difficult to ask other members of this team for help.',
  PS6: 'No one on this team would deliberately act in a way that undermines my efforts.',
  PS7: 'Working with members of this team, my unique skills and talents are valued and utilized.'
};

/** Team Opinion — anonymous staff battery. Wording is verbatim: DO NOT EDIT. */
function buildTeamOpinion_() {
  var p = FormApp.create('Team Opinion');
  p.setDescription('Team Opinion - about 5 minutes, anonymous. 20 quick rating ' +
    'questions plus 2 optional comments. This is anonymous: no email is collected ' +
    'and no names are asked. Please don\'t write anyone\'s names in the text answers ' +
    '- including your own. Honest answers help the firm fix the right things. ' +
    'Nothing you write will be attributed to you.');
  p.setCollectEmail(false);
  p.setAllowResponseEdits(false);
  p.setConfirmationMessage('Thank you - your response is anonymous and has been recorded.');

  // Section 1 — Your work (cols B..G)
  a0page_(p, 'Your work', 'Six questions about workload, balance and your job overall.');
  scale5_(p, TO.QD2, TO.FREQ);
  scale5_(p, TO.QD3, TO.FREQ);
  scale5_(p, TO.WF2, TO.EXT);
  scale5_(p, TO.WF3, TO.EXT);
  scale5_(p, TO.PD2, TO.EXT);
  scale5_(p, TO.JS4, TO.SAT);

  // Section 2 — How you're managed (cols H..M)
  a0page_(p, 'How you\'re managed', 'Six questions about support, clarity, fairness and trust.');
  scale5_(p, TO.SS, TO.FREQ);
  scale5_(p, TO.CL1, TO.EXT);
  scale5_(p, TO.RE1, TO.EXT);
  scale5_(p, TO.JU1, TO.EXT);
  scale5_(p, TO.JU4, TO.EXT);
  scale5_(p, TO.TMX2, TO.EXT);

  // Section 3 — Your team (cols N..U)
  a0page_(p, 'Your team', 'Eight questions about your team.');
  scale5_(p, TO.SW1, TO.FREQ);
  scale7_(p, TO.PS1);
  scale7_(p, TO.PS2);
  scale7_(p, TO.PS3);
  scale7_(p, TO.PS4);
  scale7_(p, TO.PS5);
  scale7_(p, TO.PS6);
  scale7_(p, TO.PS7);

  // Section 4 — Optional comments (cols V..W)
  a0page_(p, 'Optional comments', 'Two open questions - completely optional.');
  var o1 = p.addParagraphTextItem();
  o1.setTitle('What\'s the best thing about working here?');
  var o2 = p.addParagraphTextItem();
  o2.setTitle('If you could change ONE thing about working here, what would it be?');
  return p;
}

/** Closes Team Opinion after the 5-day window (run manually from the editor). */
function closeTeamOpinion() {
  var id = PropertiesService.getScriptProperties().getProperty(ID_KEYS.teamOpinion);
  if (!id) { Logger.log('No Team Opinion form ID stored - nothing to close.'); return; }
  FormApp.openById(id).setAcceptingResponses(false);
  Logger.log('Team Opinion closed to further responses.');
}

// ------------------------------------------------- Scoring tabs

/**
 * TeamOpinion_Scoring — 11 dimensions, official COPSOQ 0-100 + Edmondson health,
 * within-firm flags (bottom 2 by health). Dashboard — founder headline + context.
 */
function buildScoringTabs_(ss) {
  var R = 'TeamOpinion_Responses!';
  var sc = ss.insertSheet('TeamOpinion_Scoring');
  sc.getRange('A1:F1').setValues([['Dimension', 'Official (0-100)', 'Health (0-100)',
    'Direction', 'Rank (health)', 'Flag']]);
  var dims = [
    ['Quantitative Demands (QD2,QD3)', '=IFERROR((5-AVERAGE(' + R + 'B2:C))*25,"")', 'risk'],
    ['Work-Life Conflict (WF2,WF3)', '=IFERROR((5-AVERAGE(' + R + 'D2:E))*25,"")', 'risk'],
    ['Supervisor Support (SS)', '=IFERROR((5-AVERAGE(' + R + 'H2:H))*25,"")', 'protective'],
    ['Role Clarity (CL1)', '=IFERROR((5-AVERAGE(' + R + 'I2:I))*25,"")', 'protective'],
    ['Recognition (RE1)', '=IFERROR((5-AVERAGE(' + R + 'J2:J))*25,"")', 'protective'],
    ['Justice (JU1,JU4)', '=IFERROR((5-AVERAGE(' + R + 'K2:L))*25,"")', 'protective'],
    ['Trust in Management (TMX2)', '=IFERROR((5-AVERAGE(' + R + 'M2:M))*25,"")', 'protective'],
    ['Sense of Community (SW1)', '=IFERROR((5-AVERAGE(' + R + 'N2:N))*25,"")', 'protective'],
    ['Possibilities for Development (PD2)', '=IFERROR((5-AVERAGE(' + R + 'F2:F))*25,"")', 'protective'],
    ['Job Satisfaction (JS4)', '=IFERROR((5-AVERAGE(' + R + 'G2:G))*25,"")', 'protective'],
    ['Psychological Safety (PS1-PS7)', '=IF(B14="","",((B14-1)/6)*100)', 'protective']
  ];
  for (var i = 0; i < dims.length; i++) {
    var row = i + 2;
    sc.getRange('A' + row).setValue(dims[i][0]);
    sc.getRange('B' + row).setFormula(dims[i][1]);
    var protective = dims[i][2] === 'protective';
    sc.getRange('C' + row).setFormula(protective ? '=IF(B' + row + '="","",B' + row + ')'
      : '=IF(B' + row + '="","",100-B' + row + ')');
    sc.getRange('D' + row).setValue(protective ? 'protective' : 'risk');
    sc.getRange('E' + row).setFormula('=IF(C' + row + '="","",COUNTIF($C$2:$C$12,"<"&C' +
      row + ')+1)');
    sc.getRange('F' + row).setFormula('=IF(E' + row + '="","",IF(E' + row +
      '<=2,"FLAG",""))');
  }

  // Edmondson mean (1-7): reverse PS1/PS3/PS5 (cols O,Q,S); PS2/PS4/PS6/PS7 = P,R,T,U
  sc.getRange('A14').setValue('Psychological safety (1-7 mean)');
  sc.getRange('B14').setFormula('=IFERROR((SUM(' + R + 'P2:P)+SUM(' + R + 'R2:R)+SUM(' +
    R + 'T2:T)+SUM(' + R + 'U2:U)+(8*3*COUNT(' + R + 'P2:P)-SUM(' + R + 'O2:O)-SUM(' +
    R + 'Q2:Q)-SUM(' + R + 'S2:S)))/(7*COUNT(' + R + 'P2:P)),"")');
  sc.getRange('A15').setValue('n (Team Opinion responses)');
  sc.getRange('B15').setFormula('=COUNT(' + R + 'B2:B)');
  sc.getRange('B2:C12').setNumberFormat('0');
  sc.getRange('B14').setNumberFormat('0.00');
  sc.getRange('A1:F1').setFontWeight('bold');
  sc.setFrozenRows(1);
  sc.setColumnWidth(1, 320);

  // ---------------------------------------------------------- Dashboard
  var db = ss.insertSheet('Dashboard');
  var L = 'LeaderViews_Responses!';
  db.getRange('A1').setValue('CA Firm Diagnostic - Leader Views + Team Opinion (auto-computed)');

  db.getRange('A2:A6').setValues([
    ['Founder goal (next 12 months)'],
    ['Lag target (6-month proof)'],
    ['Vision (3 years)'],
    ['Psychological safety (1-7)'],
    ['Team Opinion responses (n)']
  ]);
  db.getRange('B2').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'C2:C<>""),' + L +
    'C2:C),"-")');
  db.getRange('B3').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'G2:G<>""),' + L + 'G2:G),' +
    'IFERROR(LOOKUP(2,1/(' + L + 'N2:N<>""),' + L + 'N2:N),' +
    'IFERROR(LOOKUP(2,1/(' + L + 'U2:U<>""),' + L + 'U2:U),' +
    'IFERROR(LOOKUP(2,1/(' + L + 'AB2:AB<>""),' + L + 'AB2:AB),' +
    'IFERROR(LOOKUP(2,1/(' + L + 'AI2:AI<>""),' + L + 'AI2:AI),"-")))))');
  db.getRange('B4').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'B2:B<>""),' + L +
    'B2:B),"-")');
  db.getRange('B5').setFormula('=TeamOpinion_Scoring!B14');
  db.getRange('B6').setFormula('=TeamOpinion_Scoring!B15');
  db.getRange('B5').setNumberFormat('0.00');

  db.getRange('A8:C8').setValues([['DIMENSION', 'HEALTH (0-100)', 'FLAG']]);
  for (var d = 0; d < 11; d++) {
    var dr = d + 9;
    db.getRange('A' + dr).setFormula('=TeamOpinion_Scoring!A' + (d + 2));
    db.getRange('B' + dr).setFormula('=TeamOpinion_Scoring!C' + (d + 2));
    db.getRange('C' + dr).setFormula('=TeamOpinion_Scoring!F' + (d + 2));
  }
  db.getRange('B9:B19').setNumberFormat('0');

  db.getRange('A21').setValue('CONTEXT (firm profile, founder estimate)');
  db.getRange('A22:A29').setValues([
    ['Partners'], ['Staff (excl. partners)'], ['Articled / trainees'],
    ['CA-qualified (non-partner)'], ['Leverage: staff per partner'],
    ['Revenue direction (3 years)'], ['Exits last 24 months (founder est.)'],
    ['Service lines']
  ]);
  db.getRange('B22').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AP2:AP<>""),' + L + 'AP2:AP),"-")');
  db.getRange('B23').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AQ2:AQ<>""),' + L + 'AQ2:AQ),"-")');
  db.getRange('B24').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AR2:AR<>""),' + L + 'AR2:AR),"-")');
  db.getRange('B25').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AS2:AS<>""),' + L + 'AS2:AS),"-")');
  db.getRange('B26').setFormula('=IFERROR(B23/B22,"")');
  db.getRange('B27').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AU2:AU<>""),' + L + 'AU2:AU),"-")');
  db.getRange('B28').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AV2:AV<>""),' + L + 'AV2:AV),"-")');
  db.getRange('B29').setFormula('=IFERROR(LOOKUP(2,1/(' + L + 'AT2:AT<>""),' + L + 'AT2:AT),"-")');
  db.getRange('B26').setNumberFormat('0.0');

  db.getRange('A1').setFontWeight('bold');
  db.getRange('A8:C8').setFontWeight('bold');
  db.getRange('A21').setFontWeight('bold');
  db.setColumnWidth(1, 340);
  db.setColumnWidth(2, 520);
  db.setFrozenRows(1);
}

// --------------------------------------------------------------- helpers

function a0page_(form, title, subtitle) {
  var br = form.addPageBreakItem();
  br.setTitle(title);
  if (subtitle) br.setHelpText(subtitle);
  return br;
}

function mc_(form, title, opts, required) {
  var it = form.addMultipleChoiceItem();
  it.setTitle(title);
  it.setChoiceValues(opts);
  if (required) it.setRequired(true);
  return it;
}

function txt_(form, title, help, required) {
  var it = form.addTextItem();
  it.setTitle(title);
  if (help) it.setHelpText(help);
  if (required) it.setRequired(true);
  return it;
}

function para_(form, title, required) {
  var it = form.addParagraphTextItem();
  it.setTitle(title);
  if (required) it.setRequired(true);
  return it;
}

function scale5_(form, title, anchors) {
  var it = form.addScaleItem();
  it.setTitle(title);
  it.setBounds(1, 5);
  it.setLabels(anchors[0], anchors[4]);
  it.setHelpText('1 = ' + anchors[0] + '  ·  2 = ' + anchors[1] + '  ·  3 = ' +
    anchors[2] + '  ·  4 = ' + anchors[3] + '  ·  5 = ' + anchors[4]);
  it.setRequired(true);
  return it;
}

function scale7_(form, title) {
  var it = form.addScaleItem();
  it.setTitle(title);
  it.setBounds(1, 7);
  it.setLabels('Strongly disagree', 'Strongly agree');
  it.setHelpText('1 = Strongly disagree  ·  2  ·  3  ·  4  ·  5  ·  6  ·  ' +
    '7 = Strongly agree');
  it.setRequired(true);
  return it;
}

/** Clears stored IDs (including legacy keys) so a clean rebuild can run. */
function clearBuild_() {
  var props = PropertiesService.getScriptProperties();
  [ID_KEYS.leaderViews, ID_KEYS.teamOpinion, ID_KEYS.ss,
   'LINKA_FORM_ID', 'LINKC_FORM_ID', 'PULSE_FORM_ID'].forEach(function (k) {
    props.deleteProperty(k);
  });
  Logger.log('Stored IDs cleared (current + legacy). NOTE: existing forms/' +
    'workbook were NOT deleted - find them in Google Drive and remove manually ' +
    'to avoid duplicates.');
}
