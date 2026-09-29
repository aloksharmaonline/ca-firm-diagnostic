/**
 * CA Firm Diagnostic — one-paste builder  (RUN ONCE)
 *
 * Creates:
 *   Link A — Founder wizard (branched: destination -> branch -> vision)
 *   Link C — Staff pulse (anonymous, 12 items)
 *   Workbook — response tabs + auto-scoring tabs (Pulse_Scoring, Dashboard)
 *
 * Usage: paste into script.google.com -> Run -> buildDiagnostic
 * Rerun creates DUPLICATES — run once. If you must rebuild, delete the
 * script project's saved IDs first: PropertiesService -> remove 'LINKA_FORM_ID'.
 *
 * After running: follow README.md (dry-run first, then share).
 */

var ID_KEYS = {
  linkA: 'LINKA_FORM_ID',
  pulse: 'PULSE_FORM_ID',
  ss: 'WORKBOOK_ID'
};

function buildDiagnostic() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty(ID_KEYS.linkA)) {
    Logger.log('ALREADY BUILT — stopping to avoid duplicates.');
    Logger.log('Existing Link A: ' + props.getProperty(ID_KEYS.linkA));
    Logger.log('To rebuild, run clearBuild_() first, then buildDiagnostic().');
    return;
  }

  try {
    // ---------------------------------------------------- LINK A: founder wizard
    var a = FormApp.create('CA Firm Diagnostic - Founder (Link A)');
    a.setDescription('A 12-minute structured conversation about where the firm is ' +
      'and where you want it. There are no right answers - your honest view shapes ' +
      'the plan. The next section adapts to what you pick first.');
    a.setCollectEmail(false);
    a.setAllowResponseEdits(true);
    a.setConfirmationMessage('Submitted. Your answers are now feeding the diagnostic - ' +
      'next step is a short review session.');

    // Page 1: destination question (routing set AFTER sections exist)
    var destQ = mc_(a, 'In the next 12 months, what would you most want to fix or change?',
      ['Growing revenue / taking on more work',
       'People - keeping good people / their motivation',
       'Succession - someone to carry the firm besides me',
       'Quality & risk - errors, review, compliance slips',
       'My own time - I am the bottleneck',
       "Not sure / it's a mix of things"], true);

    // --- Branch: Growth & capacity
    var brG = a.addPageBreakItem().setTitle('Growth & capacity')
      .setHelpText('Three questions on capacity and growth.');
    mc_(a, 'What best describes the firm\'s capacity right now?',
      ['We\'re maxed out - can\'t take more work',
       'We could take more, but something holds us back',
       'Plenty of capacity - the issue is getting the work'], true);
    txt_(a, 'If three good people joined next month, what could the firm do that it can\'t today?',
      'One or two lines.', true);
    mc_(a, 'Biggest blocker to growing from where you are today?',
      ['Not enough people with the right skills',
       'My own time and involvement',
       'Getting clients / pipeline',
       'Fear of quality slipping as we grow'], true);

    // --- Branch: People & motivation
    var brP = a.addPageBreakItem().setTitle('People & motivation')
      .setHelpText('Four questions on the people situation.');
    mc_(a, 'Which best describes the people situation?',
      ['Good people leave too soon',
       'We struggle to attract good people',
       'People stay but aren\'t growing',
       'A mix of these'], true);
    txt_(a, 'One person the firm cannot afford to lose:',
      'Leave blank to skip. Used only for your continuity planning - not scored.', false);
    mc_(a, 'When someone good resigns, how do you usually learn why?',
      ['We have a proper exit conversation',
       'I hear it indirectly from others',
       'I can only guess',
       'I usually don\'t find out'], true);
    mc_(a, 'In your view, why do good people leave here?',
      ['No visible career path',
       'Pay below market',
       'Workload / season pressure',
       'Not enough guidance or mentoring',
       'They get pulled by industry / Big 4'], true);

    // --- Branch: Succession & mid-layer
    var brS = a.addPageBreakItem().setTitle('Succession & mid-layer')
      .setHelpText('Three questions on continuity beyond you.');
    mc_(a, 'If you stopped working tomorrow, what would happen?',
      ['The firm would struggle badly',
       'A few people could carry parts of it',
       'There\'s a clear person/team that could carry it'], true);
    txt_(a, 'Besides you, who has real relationships with clients?',
      'Names or roles.', true);
    mc_(a, 'How much of your week is work only you can do?',
      ['Less than 25%', '25-50%', '50-75%', 'More than 75%'], true);

    // --- Branch: Quality & risk
    var brQ = a.addPageBreakItem().setTitle('Quality & risk')
      .setHelpText('Three questions on errors and review.');
    mc_(a, 'When errors happen, where are they usually caught?',
      ['In our own review', 'The client flags them', 'Found late / after filing', 'Not tracked'], true);
    txt_(a, 'Where is the review/approval bottleneck today?', 'One or two lines.', true);
    mc_(a, 'Biggest quality risk right now?',
      ['Workload in peak season', 'Skill gaps in the team',
       'No standard processes / templates', 'Unclear who is accountable'], true);

    // --- Branch: Your time & delegation
    var brT = a.addPageBreakItem().setTitle('Your time & delegation')
      .setHelpText('Three questions on where your time goes.');
    mc_(a, 'What eats most of your calendar?',
      ['Client work only I can do', 'Firefighting and re-review', 'People issues',
       'Business development', 'Admin and coordination'], true);
    txt_(a, 'First thing you\'d hand off if you could trust it would be done right?',
      'One line.', true);
    mc_(a, 'How often do people bring you decisions they could make themselves?',
      ['Rarely', 'Sometimes', 'Often', 'Almost always'], true);

    // --- "Not sure" mini-branch (routing set after Vision exists)
    var brN = a.addPageBreakItem().setTitle('Let\'s pinpoint it')
      .setHelpText('One question - pick what feels most stuck.');
    var pinpointQ = mc_(a, 'Which area feels most stuck today?',
      ['Growing revenue / taking on more work',
       'People - keeping good people',
       'Succession',
       'Quality & risk',
       'My own time'], true);

    // --- Vision (all branches converge here)
    var brVision = a.addPageBreakItem().setTitle('Vision - where the firm is going')
      .setHelpText('Three questions about the firm you want, not the firm you have.');
    para_(a, 'Imagine the firm is working exactly right three years from now. ' +
      'What is true that isn\'t true today?', true);
    para_(a, 'What must the firm never lose - what does it stand for?', true);
    txt_(a, 'In one line, what should the firm be known for?', 'One line.', true);

    // --- Reality check & success test
    a.addPageBreakItem().setTitle('Reality check & success test')
      .setHelpText('What you have tried, and how we will know it worked.');
    para_(a, 'What have you already tried to fix this? What happened?', true);
    para_(a, 'What signs or numbers will tell you it\'s actually working?', true);

    // --- Firm profile (last section)
    a.addPageBreakItem().setTitle('Firm profile - last section')
      .setHelpText('Seven quick facts. Type numbers.');
    txt_(a, 'How many partners?', 'Type a number.', true);
    txt_(a, 'Total staff (excluding partners)?', 'Type a number.', true);
    txt_(a, 'How many are articled clerks / trainees?', 'Type a number.', true);
    txt_(a, 'How many are CA-qualified (not partners)?', 'Type a number.', true);
    var lines = a.addCheckboxItem();
    lines.setTitle('Service lines - select all that apply');
    lines.setChoiceValues(['Audit & assurance', 'Income tax', 'GST & indirect tax',
      'ROC & compliance', 'Advisory & other']);
    lines.setRequired(true);
    mc_(a, 'Revenue direction, last 3 years?', ['Up', 'Flat', 'Down'], true);
    txt_(a, 'People who left in the last 24 months (approximate)?',
      'Your best estimate - type a number.', true);

    // --- Late-bound routing: destination + pinpoint (choice-level nav).
    // All sections exist now, so choices can reference their page breaks.
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

    // End-of-branch navigation: "after completing the page BEFORE this break, go to Vision"
    brP.setGoToPage(brVision); // completes Growth page  -> Vision
    brS.setGoToPage(brVision); // completes People page  -> Vision
    brQ.setGoToPage(brVision); // completes Succession   -> Vision
    brT.setGoToPage(brVision); // completes Quality      -> Vision
    brN.setGoToPage(brVision); // completes My-time      -> Vision
    // Pinpoint page -> Vision by default; pinpointQ choice-nav overrides into branches.

    // ---------------------------------------------------- LINK C: staff pulse
    var pulse = buildLinkC_();

    // ---------------------------------------------------- Workbook + destinations
    var ss = SpreadsheetApp.create('CA Firm Diagnostic - Responses');
    a.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    pulse.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    bindResponseSheets(ss);
    buildScoringTabs_(ss);

    // ---------------------------------------------------- Save IDs + report
    props.setProperty(ID_KEYS.linkA, a.getId());
    props.setProperty(ID_KEYS.pulse, pulse.getId());
    props.setProperty(ID_KEYS.ss, ss.getId());

    Logger.log('=== BUILD COMPLETE ===');
    Logger.log('LINK A (send to founder): ' + a.getPublishedUrl());
    Logger.log('LINK A (edit form):       ' + a.getEditUrl());
    Logger.log('LINK C (forward to team): ' + pulse.getPublishedUrl());
    Logger.log('LINK C (edit form):       ' + pulse.getEditUrl());
    Logger.log('WORKBOOK (scoring):       ' + ss.getUrl());
    Logger.log('NEXT: check workbook has tabs LinkA_Responses + LinkC_Responses ' +
      '(if not, run bindResponseSheets again after one test submission), ' +
      'then dry-run per 04_analysis_engine.md before sharing.');

  } catch (e) {
    Logger.log('BUILD ERROR: ' + e.message + (e.lineNumber ? ' (line ' + e.lineNumber + ')' : ''));
    throw e;
  }
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
  var foundA = false, foundC = false;
  for (var i = 0; i < sheets.length; i++) {
    var sh = sheets[i];
    var name = sh.getName();
    if (name === 'LinkA_Responses' || name === 'LinkC_Responses') continue;
    var b1 = '';
    try { b1 = String(sh.getRange('B1').getValue()); } catch (err) { continue; }
    if (b1.indexOf('next 12 months') > -1) {
      sh.setName('LinkA_Responses'); foundA = true;
      Logger.log('Bound: ' + name + ' -> LinkA_Responses');
    } else if (b1.indexOf('career here') > -1) {
      sh.setName('LinkC_Responses'); foundC = true;
      Logger.log('Bound: ' + name + ' -> LinkC_Responses');
    }
  }
  if (!foundA || !foundC) {
    Logger.log('WARN: response tabs not fully bound (A:' + foundA + ' C:' + foundC + ').');
    Logger.log('Likely cause: headers not written yet. Submit one test response ' +
      'to each form, then run bindResponseSheets() again.');
    Logger.log('Tabs present: ' + sheets.map(function (s) { return s.getName(); }).join(', '));
  }
}

/** Link C — anonymous staff pulse. */
function buildLinkC_() {
  var p = FormApp.create('CA Firm Pulse - Team (Link C)');
  p.setDescription('Team Pulse - 4 minutes, anonymous. 12 quick questions. ' +
    'This is anonymous: no email is collected and no names are asked. ' +
    'Please do not write anyone\'s names in the text answers - including your own. ' +
    'Honest answers help the firm fix the right things. Nothing you write will be ' +
    'attributed to you.');
  p.setCollectEmail(false);
  p.setAllowResponseEdits(false);
  p.setConfirmationMessage('Thank you - your response is anonymous and has been recorded.');

  var help = '1 = Strongly disagree  |  2 = Disagree  |  3 = Neutral  |  4 = Agree  |  5 = Strongly agree';
  var likert = [
    'I can see a next step for my career here.',
    'I\'m learning and growing through my work here.',
    'I can see myself working here two years from now.',
    'My workload is manageable through most of the year.',
    'Even in peak/busy season, a sustainable pace is possible.',
    'I can do good work here without burning out.',
    'I can speak openly with the partners/seniors about problems.',
    'I know what\'s expected of me and how my work is judged.',
    'Good work gets noticed here.',
    'I have seriously considered leaving this firm in the past 6 months.'
  ];
  for (var i = 0; i < likert.length; i++) {
    var it = p.addScaleItem();
    it.setTitle(likert[i]);
    it.setBounds(1, 5);
    it.setLabels('Disagree', 'Agree');
    it.setHelpText(help);
    it.setRequired(true);
  }
  var o1 = p.addParagraphTextItem();
  o1.setTitle('What\'s the best thing about working here?');
  o1.setRequired(false);
  var o2 = p.addParagraphTextItem();
  o2.setTitle('If you could change ONE thing about working here, what would it be?');
  o2.setRequired(false);
  return p;
}

/** Closes the pulse after the 5-day window (run manually from the editor). */
function closePulse() {
  var id = PropertiesService.getScriptProperties().getProperty(ID_KEYS.pulse);
  if (!id) { Logger.log('No pulse form ID stored - nothing to close.'); return; }
  FormApp.openById(id).setAcceptingResponses(false);
  Logger.log('Pulse closed to further responses.');
}

/** Scoring tabs: Pulse_Scoring (per-question) + Dashboard (headline). */
function buildScoringTabs_(ss) {
  // ---------- Pulse_Scoring ----------
  var sc = ss.insertSheet('Pulse_Scoring');
  sc.getRange('A1:C1').setValues([['Question', 'Block', 'Favorable %']]);
  var rows = [
    ['G1 Career next step here', 'Growth', 'B'],
    ['G2 Learning & growth', 'Growth', 'C'],
    ['G3 Future here (2 years)', 'Growth', 'D'],
    ['W1 Workload manageable', 'Workload', 'E'],
    ['W2 Sustainable peak season', 'Workload', 'F'],
    ['W3 No burnout', 'Workload', 'G'],
    ['S1 Open with partners', 'Support', 'H'],
    ['S2 Expectations clear', 'Support', 'I'],
    ['S3 Good work noticed', 'Support', 'J'],
    ['T1 Considered leaving (6 mo)', 'Turnover intent', 'K']
  ];
  var labels = [], blocks = [], formulas = [];
  for (var i = 0; i < rows.length; i++) {
    labels.push([rows[i][0]]);
    blocks.push([rows[i][1]]);
    var col = rows[i][2];
    formulas.push(['=IFERROR(COUNTIF(LinkC_Responses!' + col + '2:' + col + ',">=4")' +
      '/COUNT(LinkC_Responses!' + col + '2:' + col + '),"")']);
  }
  sc.getRange('A2:A11').setValues(labels);
  sc.getRange('B2:B11').setValues(blocks);
  sc.getRange('C2:C11').setFormulas(formulas);

  sc.getRange('A13:A17').setValues([
    ['Growth block avg'], ['Workload block avg'], ['Support block avg'],
    ['Turnover intent %'], ['n (responses)']
  ]);
  sc.getRange('C13:C17').setFormulas([
    ['=IFERROR(AVERAGE(C2:C4),"")'],
    ['=IFERROR(AVERAGE(C5:C7),"")'],
    ['=IFERROR(AVERAGE(C8:C10),"")'],
    ['=C11'],
    ['=COUNT(LinkC_Responses!B2:B)']
  ]);
  sc.getRange('C2:C16').setNumberFormat('0%');
  sc.setFrozenRows(1);

  // ---------- Dashboard ----------
  var db = ss.insertSheet('Dashboard');
  db.getRange('A1').setValue('CA Firm Diagnostic - Dashboard (auto-computed)');

  db.getRange('A2:A4').setValues([
    ['Engagement priority (founder, Link A)'],
    ['Founder\'s definition of "solved" (Link A)'],
    ['Pulse responses (n)']
  ]);
  db.getRange('B2').setFormula('=IFERROR(LOOKUP(2,1/(LinkA_Responses!B2:B<>""),' +
    'LinkA_Responses!B2:B),"-")');
  db.getRange('B3').setFormula('=IFERROR(LOOKUP(2,1/(LinkA_Responses!X2:X<>""),' +
    'LinkA_Responses!X2:X),"-")');
  db.getRange('B4').setFormula('=Pulse_Scoring!C17');

  db.getRange('A6:C6').setValues([['METRIC', 'VALUE', 'FLAG']]);
  db.getRange('A7:A11').setValues([
    ['Overall pulse favorable'],
    ['Growth block (career path)'],
    ['Workload block (burnout)'],
    ['Support block (leadership)'],
    ['Turnover intent (want to leave)']
  ]);
  db.getRange('B7:B11').setFormulas([
    ['=IFERROR(AVERAGE(Pulse_Scoring!C2:C11),"")'],
    ['=Pulse_Scoring!C13'],
    ['=Pulse_Scoring!C14'],
    ['=Pulse_Scoring!C15'],
    ['=Pulse_Scoring!C16']
  ]);
  db.getRange('C7:C11').setFormulas([
    ['=IF(B7="","",IF(B7<0.5,"RED","OK"))'],
    ['=IF(B8="","",IF(B8<0.5,"RED","OK"))'],
    ['=IF(B9="","",IF(B9<0.5,"RED","OK"))'],
    ['=IF(B10="","",IF(B10<0.5,"RED","OK"))'],
    ['=IF(B11="","",IF(B11>=0.3,"WATCH","OK"))']
  ]);
  db.getRange('B7:B11').setNumberFormat('0%');

  db.getRange('A13').setValue('CONTEXT (firm profile, founder estimate)');
  db.getRange('A14:A21').setValues([
    ['Partners'], ['Staff (excl. partners)'], ['Articled / trainees'],
    ['CA-qualified (non-partner)'], ['Leverage: staff per partner'],
    ['Revenue direction (3 years)'], ['Exits last 24 months (founder est.)'],
    ['Service lines']
  ]);
  db.getRange('B14:B17').setFormulas([
    ['=IFERROR(LOOKUP(2,1/(LinkA_Responses!Y2:Y<>""),LinkA_Responses!Y2:Y),"-")'],
    ['=IFERROR(LOOKUP(2,1/(LinkA_Responses!Z2:Z<>""),LinkA_Responses!Z2:Z),"-")'],
    ['=IFERROR(LOOKUP(2,1/(LinkA_Responses!AA2:AA<>""),LinkA_Responses!AA2:AA),"-")'],
    ['=IFERROR(LOOKUP(2,1/(LinkA_Responses!AB2:AB<>""),LinkA_Responses!AB2:AB),"-")']
  ]);
  db.getRange('B18').setFormula('=IFERROR(B15/B14,"")');
  db.getRange('B19').setFormula('=IFERROR(LOOKUP(2,1/(LinkA_Responses!AD2:AD<>""),' +
    'LinkA_Responses!AD2:AD),"-")');
  db.getRange('B20').setFormula('=IFERROR(LOOKUP(2,1/(LinkA_Responses!AE2:AE<>""),' +
    'LinkA_Responses!AE2:AE),"-")');
  db.getRange('B21').setFormula('=IFERROR(LOOKUP(2,1/(LinkA_Responses!AC2:AC<>""),' +
    'LinkA_Responses!AC2:AC),"-")');
  db.getRange('B18').setNumberFormat('0.0');

  db.getRange('A1:A21').setFontWeight('normal');
  db.getRange('A1').setFontWeight('bold');
  db.getRange('A6:C6').setFontWeight('bold');
  db.setColumnWidth(1, 340);
  db.setColumnWidth(2, 520);
  db.setFrozenRows(1);
}

// --------------------------------------------------------------- helpers

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

/** Only used if a partial build leaves stale IDs behind. */
function clearBuild_() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty(ID_KEYS.linkA);
  props.deleteProperty(ID_KEYS.pulse);
  props.deleteProperty(ID_KEYS.ss);
  Logger.log('Stored IDs cleared. NOTE: existing forms/workbook were NOT deleted - ' +
    'find them in Google Drive and remove manually to avoid duplicates.');
}
