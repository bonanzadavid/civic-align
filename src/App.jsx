import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Scale,
  Users,
  Shield,
  Info,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  User,
  LayoutDashboard,
  Building2,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Minus,
  ScrollText,
  BookOpen,
  ExternalLink,
  Key,
  X,
  Edit,
  Check,
  FileText,
  Gavel,
  Hash,
  Briefcase,
  GraduationCap,
  MessageCircle
} from 'lucide-react';

/**
* MOCK DATA - POLITICIAN DIRECTORY
* Updated with 'career' and 'education' for credentials
* Using Wikimedia Commons public domain images for authenticity
*/
const POLITICIANS = [
  // NATIONAL / FAMOUS FIGURES (Federal)
  {
    id: 'berniesanders', name: 'Bernie Sanders', state: 'VT', role: 'Senator', party: 'Independent', level: 'Federal',
    isRunning: true,
    scores: { econ: -9, social: -8, gov: 6 },
    approval: 62,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bernie_Sanders_in_March_2020.jpg/500px-Bernie_Sanders_in_March_2020.jpg",
    bio: "The longest-serving independent in U.S. congressional history, known for his focus on income inequality and universal healthcare.",
    rationale: "Voted for Inflation Reduction Act, advocates for Medicare for All, opposes defense spending increases.",
    stances: ["Universal Healthcare", "Tuition-free College", "Wealth Tax"],
    career: [
      "Chair, Senate Budget Committee (2021–2023)",
      "U.S. House of Representatives (1991–2007)",
      "Mayor of Burlington, VT (1981–1989)"
    ],
    education: [
      "University of Chicago (B.A. Political Science)"
    ],
    sources: [
      { title: "S.4204 - Medicare for All Act", url: "https://www.congress.gov/bill/117th-congress/senate-bill/4204" },
      { title: "Voting Record - Congress.gov", url: "https://www.congress.gov/member/bernard-sanders/S000033" },
      {
        title: "Campaign Finance - OpenSecrets", url:
          "https://www.opensecrets.org/members-of-congress/bernie-sanders/summary?cid=N00000528"
      }
    ],
    votingHistory: [
      { bill: "Inflation Reduction Act of 2022", vote: "Yea", status: "Passed" },
      { bill: "American Rescue Plan Act of 2021", vote: "Yea", status: "Passed" },
      { bill: "National Defense Authorization Act 2024", vote: "Nay", status: "Passed" },
      { bill: "Respect for Marriage Act", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'tedcruz', name: 'Ted Cruz', state: 'TX', role: 'Senator', party: 'Republican', level: 'Federal',
    isRunning: true,
    scores: { econ: 8, social: 7, gov: -2 },
    approval: 48,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ted_Cruz_official_113th_Congress_photo_portrait.jpg/500px-Ted_Cruz_official_113th_Congress_photo_portrait.jpg",
    bio: "A junior U.S. Senator for Texas known for his conservative stances on fiscal and social issues.",
    rationale: "Led opposition to ACA, consistently votes against federal spending increases, supports strict border enforcement.",
    stances: ["Second Amendment Rights", "Limited Government", "Border Security"],
    career: [
      "Solicitor General of Texas (2003–2008)",
      "Associate Deputy Attorney General, U.S. DOJ",
      "Law Clerk to Chief Justice William Rehnquist"
    ],
    education: [
      "Princeton University (B.A. Public Policy)",
      "Harvard Law School (J.D.)"
    ],
    sources: [
      {
        title: "2013 Filibuster Speech (C-SPAN)", url:
          "https://www.c-span.org/video/?315160-1/senator-ted-cruz-filibuster-affordable-care-act"
      },
      { title: "Voting Record - GovTrack", url: "https://www.govtrack.us/congress/members/ted_cruz/412573" },
      {
        title: "Donor History - OpenSecrets", url:
          "https://www.opensecrets.org/members-of-congress/ted-cruz/summary?cid=N00033085"
      }
    ],
    votingHistory: [
      { bill: "Inflation Reduction Act of 2022", vote: "Nay", status: "Passed" },
      { bill: "Bipartisan Safer Communities Act", vote: "Nay", status: "Passed" },
      { bill: "Infrastructure Investment and Jobs Act", vote: "Nay", status: "Passed" },
      { bill: "Keystone XL Pipeline Approval", vote: "Yea", status: "Failed" }
    ]
  },
  {
    id: 'aoc', name: 'Alexandria Ocasio-Cortez', state: 'NY', role: 'Representative', party: 'Democrat', level: 'Federal',
    isRunning: true,
    scores: { econ: -8, social: -9, gov: 4 },
    approval: 51,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/500px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg",
    bio: "Representative for New York's 14th congressional district, advocating for progressive economic and social reforms.",
    rationale: "Co-sponsored Green New Deal, votes against military budget increases, supports student debt cancellation.",
    stances: ["Green New Deal", "Housing for All", "Abolish ICE"],
    career: [
      "Educational Director, National Hispanic Institute (2017)",
      "Organizer, Bernie Sanders Campaign (2016)",
      "Service Industry / Bartender"
    ],
    education: [
      "Boston University (B.A. International Relations & Economics)"
    ],
    sources: [
      { title: "H.Res. 109 - Green New Deal", url: "https://www.congress.gov/bill/116th-congress/house-resolution/109" },
      { title: "Legislative Profile - Ballotpedia", url: "https://ballotpedia.org/Alexandria_Ocasio-Cortez" },
      { title: "Vote Smart - Bio & Votes", url: "https://justfacts.votesmart.org/candidate/180416/alexandria-ocasio-cortez" }
    ],
    votingHistory: [
      { bill: "Build Back Better Act", vote: "Yea", status: "Passed House" },
      { bill: "Iron Dome Supplemental Appropriations", vote: "Present", status: "Passed" },
      { bill: "Infrastructure Investment and Jobs Act", vote: "Nay", status: "Passed" },
      { bill: "Postal Service Reform Act", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'randpaul', name: 'Rand Paul', state: 'KY', role: 'Senator', party: 'Republican', level: 'Federal',
    isRunning: true,
    scores: { econ: 9, social: 2, gov: -8 },
    approval: 45,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Rand_Paul_117th_Congress_Portrait.jpg/500px-Rand_Paul_117th_Congress_Portrait.jpg",
    bio: "Physician and Senator known for his libertarian-leaning views on government surveillance and spending.",
    rationale: "Filibustered Patriot Act renewal, consistently votes against unbalanced budgets and foreign aid.",
    stances: ["Privacy Rights", "Fiscal Responsibility", "Non-Interventionism"],
    career: [
      "Ophthalmologist (Private Practice)",
      "Founder, Kentucky Taxpayers United"
    ],
    education: [
      "Duke University School of Medicine (M.D.)",
      "Baylor University"
    ],
    sources: [
      {
        title: "Senate Floor Speech on Patriot Act", url:
          "https://www.c-span.org/video/?326162-1/senator-rand-paul-nsa-surveillance"
      },
      { title: "GovTrack - Legislative Record", url: "https://www.govtrack.us/congress/members/rand_paul/412492" }
    ],
    votingHistory: [
      { bill: "Ukraine Supplemental Appropriations Act", vote: "Nay", status: "Passed" },
      { bill: "CARES Act (COVID-19 Relief)", vote: "Nay", status: "Passed" },
      { bill: "Justice for Breonna Taylor Act", vote: "Yea", status: "Failed" },
      { bill: "Preventing Animal Cruelty and Torture Act", vote: "Nay", status: "Passed" }
    ]
  },
  {
    id: 'joemanchin', name: 'Joe Manchin', state: 'WV', role: 'Senator', party: 'Democrat', level: 'Federal',
    isRunning: false, // NOT RUNNING
    scores: { econ: 2, social: 2, gov: 1 },
    approval: 41,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Joe_Manchin_official_portrait_112th_Congress.jpg/500px-Joe_Manchin_official_portrait_112th_Congress.jpg",
    bio: "Senator from West Virginia, often cited as a moderate centrist key to bipartisan legislation.",
    rationale: "Blocked Build Back Better Act, supported Inflation Reduction Act with fossil fuel concessions.",
    stances: ["Energy Independence", "Balanced Budget", "Bipartisanship"],
    career: [
      "Governor of West Virginia (2005–2010)",
      "Secretary of State of West Virginia (2001–2005)",
      "West Virginia State Senate"
    ],
    education: [
      "West Virginia University (B.B.A.)"
    ],
    sources: [
      {
        title: "Statement on Build Back Better", url:
          "https://www.manchin.senate.gov/newsroom/press-releases/manchin-statement-on-build-back-better-act"
      },
      { title: "Vote Smart Profile", url: "https://justfacts.votesmart.org/candidate/7547/joe-manchin-iii" }
    ],
    votingHistory: [
      { bill: "Inflation Reduction Act of 2022", vote: "Yea", status: "Passed" },
      { bill: "Women's Health Protection Act (Abortion)", vote: "Nay", status: "Failed" },
      { bill: "John Lewis Voting Rights Act", vote: "Nay", status: "Failed" }
    ]
  },
  {
    id: 'mittromney', name: 'Mitt Romney', state: 'UT', role: 'Senator', party: 'Republican', level: 'Federal',
    isRunning: false, // NOT RUNNING
    scores: { econ: 6, social: 4, gov: 3 },
    approval: 49,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Senator_Mitt_Romney_116th_Congress_official_portrait.jpg/500px-Senator_Mitt_Romney_116th_Congress_official_portrait.jpg",
    bio: "Former Governor of Massachusetts and 2012 presidential nominee, currently serving as a Senator for Utah.",
    rationale: "Voted to convict Trump in impeachment trial, supports child tax credit expansion, traditional hawk on foreign policy.",
    stances: ["Economic Growth", "National Security", "Family Values"],
    career: [
      "Governor of Massachusetts (2003–2007)",
      "CEO, Bain Capital (1984–2002)",
      "President/CEO, Salt Lake Organizing Committee (2002 Winter Olympics)"
    ],
    education: [
      "Harvard University (J.D./M.B.A.)",
      "Brigham Young University (B.A.)"
    ],
    sources: [
      {
        title: "Senate Vote 33 - Impeachment", url:
          "https://www.senate.gov/legislative/LIS/roll_call_votes/vote1162/vote_116_2_00033.htm"
      },
      { title: "Family Security Act Proposal", url: "https://www.romney.senate.gov/family-security-act/" }
    ],
    votingHistory: [
      { bill: "Respect for Marriage Act", vote: "Yea", status: "Passed" },
      { bill: "Confirmation of Ketanji Brown Jackson", vote: "Yea", status: "Confirmed" },
      { bill: "Infrastructure Investment and Jobs Act", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'elizabethwarren', name: 'Elizabeth Warren', state: 'MA', role: 'Senator', party: 'Democrat', level: 'Federal',
    isRunning: true,
    scores: { econ: -7, social: -7, gov: 7 },
    approval: 54,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Elizabeth_Warren%2C_official_portrait%2C_114th_Congress.jpg/500px-Elizabeth_Warren%2C_official_portrait%2C_114th_Congress.jpg",
    bio: "A former law professor known for her expertise in bankruptcy law and advocacy for consumer protection.",
    rationale: "Established Consumer Financial Protection Bureau, proposes Ultra-Millionaire Tax.",
    stances: ["Consumer Protection", "Anti-Corruption", "Wealth Tax"],
    career: [
      "Special Advisor, Consumer Financial Protection Bureau (2010–2011)",
      "Chair, Congressional Oversight Panel (TARP) (2008–2010)",
      "Professor of Law, Harvard Law School"
    ],
    education: [
      "Rutgers University (J.D.)",
      "University of Houston (B.S.)"
    ],
    sources: [
      { title: "CFPB Creation History", url: "https://www.consumerfinance.gov/about-us/the-bureau/creating-the-bureau/" },
      {
        title: "Ultra-Millionaire Tax Act", url:
          "https://www.warren.senate.gov/newsroom/press-releases/warren-jayapal-boyle-introduce-ultra-millionaire-tax-on-fortunes-over-50-million"
      }
    ],
    votingHistory: [
      { bill: "Corporate Tax Minimum Act", vote: "Yea", status: "Passed" },
      { bill: "Student Loan Relief Act", vote: "Yea", status: "Passed" },
      { bill: "USMCA Trade Agreement", vote: "Yea", status: "Passed" }
    ]
  },

  // CALIFORNIA
  {
    id: 'gavinnewsom', name: 'Gavin Newsom', state: 'CA', role: 'Governor', party: 'Democrat', level: 'State',
    isRunning: true,
    scores: { econ: -5, social: -8, gov: 6 },
    approval: 56,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Governor_Gavin_Newsom_Official_Portrait.jpg/500px-Governor_Gavin_Newsom_Official_Portrait.jpg",
    bio: "Governor of California focusing on climate change, homelessness, and healthcare access.",
    rationale: "Signed legislation banning gas cars by 2035, expanded state healthcare to undocumented immigrants.",
    stances: ["Climate Action", "Gun Safety", "Universal Pre-K"],
    career: [
      "Lieutenant Governor of California (2011–2019)",
      "Mayor of San Francisco (2004–2011)",
      "San Francisco Board of Supervisors"
    ],
    education: [
      "Santa Clara University (B.S. Political Science)"
    ],
    sources: [
      {
        title: "Executive Order N-79-20 (ZEV)", url:
          "https://www.gov.ca.gov/2020/09/23/governor-newsom-announces-california-will-phase-out-gasoline-powered-cars-drastically-reduce-demand-for-fossil-fuel-in-californias-fight-against-climate-change/"
      },
      { title: "Official Governor Site", url: "https://www.gov.ca.gov/" }
    ],
    votingHistory: [
      { bill: "SB 1327 (Private Right of Action on Guns)", vote: "Signed", status: "Enacted" },
      { bill: "CARE Court Act", vote: "Signed", status: "Enacted" },
      { bill: "Fast Food Recovery Act", vote: "Signed", status: "Enacted" }
    ]
  },
  {
    id: 'adamschiff', name: 'Adam Schiff', state: 'CA', role: 'Representative', party: 'Democrat', level: 'Federal',
    isRunning: true,
    scores: { econ: -4, social: -6, gov: 5 },
    approval: 52,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adam_Schiff_118th_Congress.jpg/500px-Adam_Schiff_118th_Congress.jpg",
    bio: "Representative influential in intelligence and foreign affairs committees.",
    rationale: "Led first impeachment inquiry, supports expanded voting rights legislation.",
    stances: ["Intelligence Reform", "Press Freedom", "Environmental Protection"],
    career: [
      "Chair, House Intelligence Committee (2019–2023)",
      "California State Senate (1996–2000)",
      "Assistant U.S. Attorney"
    ],
    education: [
      "Harvard Law School (J.D.)",
      "Stanford University (B.A.)"
    ],
    sources: [
      { title: "House Intelligence Committee Reports", url: "https://intelligence.house.gov/" },
      { title: "Vote Smart Record", url: "https://justfacts.votesmart.org/candidate/9489/adam-schiff" }
    ],
    votingHistory: [
      { bill: "George Floyd Justice in Policing Act", vote: "Yea", status: "Passed House" },
      { bill: "For the People Act", vote: "Yea", status: "Passed House" },
      { bill: "Protecting Our Kids Act (Gun Safety)", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'karenbass', name: 'Karen Bass', state: 'CA', role: 'Mayor (LA)', party: 'Democrat', level: 'Local',
    isRunning: true,
    scores: { econ: -6, social: -7, gov: 5 },
    approval: 58,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Karen_Bass_116th_Congress.jpg/500px-Karen_Bass_116th_Congress.jpg",
    bio: "Mayor of Los Angeles, formerly a U.S. Representative and physician assistant.",
    rationale: "Declared state of emergency on homelessness, supports community safety partnerships over traditional policing.",
    stances: ["Homelessness Solutions", "Criminal Justice Reform", "Public Safety"],
    career: [
      "U.S. House of Representatives (2011–2022)",
      "Speaker of the California Assembly (2008–2010)",
      "Physician Assistant"
    ],
    education: [
      "USC Keck School of Medicine (P.A. Program)",
      "CSU Dominguez Hills (B.S. Health Sciences)"
    ],
    sources: [
      {
        title: "Mayor's Office - Homelessness Directive", url:
          "https://mayor.lacity.gov/news/mayor-bass-signs-executive-directive-1-expedite-affordable-housing-and-shelter"
      },
      { title: "Ballotpedia Profile", url: "https://ballotpedia.org/Karen_Bass" }
    ],
    votingHistory: [
      { bill: "Executive Directive 1 (Housing)", vote: "Signed", status: "Enacted" },
      { bill: "LAPD Budget Increase 2023", vote: "Proposed", status: "Pending" }
    ]
  },

  // TEXAS
  {
    id: 'gregabbott', name: 'Greg Abbott', state: 'TX', role: 'Governor', party: 'Republican', level: 'State',
    isRunning: true,
    scores: { econ: 7, social: 8, gov: 4 },
    approval: 53,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Greg_Abbott_2015.jpg/500px-Greg_Abbott_2015.jpg",
    bio: "Governor of Texas, former Attorney General and State Supreme Court Justice.",
    rationale: "Signed restrictive abortion ban (SB8), bussed migrants to sanctuary cities, supports school vouchers.",
    stances: ["State Sovereignty", "Economic Liberty", "Law and Order"],
    career: [
      "Attorney General of Texas (2002–2015)",
      "Justice, Texas Supreme Court (1996–2001)",
      "State District Judge"
    ],
    education: [
      "Vanderbilt University Law School (J.D.)",
      "University of Texas at Austin (B.B.A.)"
    ],
    sources: [
      {
        title: "Texas Legislature - SB8 Text", url: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=87R&Bill=SB8"
      },
      { title: "Governor's Official News", url: "https://gov.texas.gov/news" }
    ],
    votingHistory: [
      { bill: "SB 8 (Heartbeat Act)", vote: "Signed", status: "Enacted" },
      { bill: "HB 1927 (Constitutional Carry)", vote: "Signed", status: "Enacted" },
      { bill: "Election Integrity Act", vote: "Signed", status: "Enacted" }
    ]
  },
  {
    id: 'dancrenshaw', name: 'Dan Crenshaw', state: 'TX', role: 'Representative', party: 'Republican', level: 'Federal',
    isRunning: true,
    scores: { econ: 7, social: 5, gov: 3 },
    approval: 47,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dan_Crenshaw_116th_Congress.jpg/500px-Dan_Crenshaw_116th_Congress.jpg",
    bio: "Former Navy SEAL serving Texas's 2nd congressional district.",
    rationale: "Supports military aid but criticized recent omnibus spending, advocates for nuclear energy expansion.",
    stances: ["Defense Strength", "Border Security", "Free Enterprise"],
    career: [
      "U.S. Navy SEAL (2006–2016)",
      "Legislative Assistant"
    ],
    education: [
      "Harvard Kennedy School (M.P.A.)",
      "Tufts University (B.A.)"
    ],
    sources: [
      { title: "Voting Record - Congress.gov", url: "https://www.congress.gov/member/dan-crenshaw/C001120" },
      { title: "Campaign Website Issues", url: "https://crenshawfortexas.com/" }
    ],
    votingHistory: [
      { bill: "Consolidated Appropriations Act 2023", vote: "Nay", status: "Passed" },
      { bill: "Ukraine Democracy Defense Lend-Lease", vote: "Yea", status: "Passed" },
      { bill: "Red Flag Law Legislation", vote: "Nay", status: "Passed" }
    ]
  },
  {
    id: 'kirkwatson', name: 'Kirk Watson', state: 'TX', role: 'Mayor (Austin)', party: 'Democrat', level: 'Local',
    isRunning: true,
    scores: { econ: -3, social: -5, gov: 2 },
    approval: 60,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Kirk_Watson_2023.jpg/500px-Kirk_Watson_2023.jpg",
    bio: "Mayor of Austin, focusing on transportation and affordability.",
    rationale: "Championed 'Project Connect' transit expansion, focuses on housing density code reforms.",
    stances: ["Urban Mobility", "Affordable Housing", "Education"],
    career: [
      "Texas State Senate (2007–2020)",
      "Mayor of Austin (1997–2001, 2023–Present)",
      "Dean, hobby School of Public Affairs (UH)"
    ],
    education: [
      "Baylor University Law School (J.D.)",
      "Baylor University (B.A.)"
    ],
    sources: [
      { title: "City of Austin - Project Connect", url: "https://www.austintexas.gov/department/project-connect" },
      { title: "Mayor's Bio", url: "https://www.austintexas.gov/department/mayor-kirk-watson" }
    ],
    votingHistory: [
      { bill: "HOME Initiative (Zoning)", vote: "Supported", status: "Passed" },
      { bill: "I-35 Expansion Project", vote: "Supported", status: "Ongoing" }
    ]
  },

  // FLORIDA
  {
    id: 'rondesantis', name: 'Ron DeSantis', state: 'FL', role: 'Governor', party: 'Republican', level: 'State',
    isRunning: true,
    scores: { econ: 7, social: 9, gov: 6 },
    approval: 55,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ron_DeSantis_official_portrait.jpg/500px-Ron_DeSantis_official_portrait.jpg",
    bio: "Governor of Florida known for his distinct approach to state management and cultural issues.",
    rationale: "Signed 'Parental Rights in Education' bill, restricted ESG investing for state funds.",
    stances: ["Education Reform", "Economic Freedom", "Public Safety"],
    career: [
      "U.S. House of Representatives (2013–2018)",
      "Prosecutor, U.S. Attorney's Office",
      "U.S. Navy JAG Officer"
    ],
    education: [
      "Harvard Law School (J.D.)",
      "Yale University (B.A.)"
    ],
    sources: [
      { title: "FL Senate Bill 1557 Text", url: "https://www.flsenate.gov/Session/Bill/2022/1557" },
      {
        title: "Executive Order on ESG", url:
          "https://www.flgov.com/2022/07/27/governor-ron-desantis-announces-initiatives-to-protect-floridians-from-esg-financial-fraud/"
      }
    ],
    votingHistory: [
      { bill: "Parental Rights in Education", vote: "Signed", status: "Enacted" },
      { bill: "Stop WOKE Act", vote: "Signed", status: "Enacted" },
      { bill: "Permitless Carry Bill", vote: "Signed", status: "Enacted" }
    ]
  },
  {
    id: 'marcorubio', name: 'Marco Rubio', state: 'FL', role: 'Senator', party: 'Republican', level: 'Federal',
    isRunning: true,
    scores: { econ: 6, social: 6, gov: 4 },
    approval: 46,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Senator_Rubio_official_portrait.jpg/500px-Senator_Rubio_official_portrait.jpg",
    bio: "Senior Senator from Florida, focusing on foreign policy and small business.",
    rationale: "Advocates for hawkish China policy, sponsored Uyghur Forced Labor Prevention Act.",
    stances: ["Foreign Policy", "Small Business", "Family Tax Credits"],
    career: [
      "Speaker, Florida House of Representatives (2006–2008)",
      "Florida House of Representatives (2000–2008)",
      "City Commissioner, West Miami"
    ],
    education: [
      "University of Miami School of Law (J.D.)",
      "University of Florida (B.S.)"
    ],
    sources: [
      {
        title: "S.65 - Uyghur Forced Labor Prevention Act", url: "https://www.congress.gov/bill/117th-congress/senate-bill/65"
      },
      { title: "Vote Smart Profile", url: "https://justfacts.votesmart.org/candidate/1601/marco-rubio" }
    ],
    votingHistory: [
      { bill: "Sunshine Protection Act", vote: "Yea", status: "Passed Senate" },
      { bill: "Chips and Science Act", vote: "Nay", status: "Passed" },
      { bill: "Inflation Reduction Act", vote: "Nay", status: "Passed" }
    ]
  },
  {
    id: 'francissuarez', name: 'Francis Suarez', state: 'FL', role: 'Mayor (Miami)', party: 'Republican', level: 'Local',
    isRunning: true,
    scores: { econ: 5, social: 1, gov: -1 },
    approval: 65,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Francis_X._Suarez_2019.jpg/500px-Francis_X._Suarez_2019.jpg",
    bio: "Mayor of Miami, advocating for tech integration and climate resilience.",
    rationale: "Promoted MiamiCoin, supports low municipal taxes to attract tech sector jobs.",
    stances: ["Tech Innovation", "Climate Resilience", "Low Taxes"],
    career: [
      "Miami City Commissioner (2009–2017)",
      "Attorney (Real Estate & Corporate)"
    ],
    education: [
      "University of Florida (J.D.)",
      "Florida International University (B.B.A.)"
    ],
    sources: [
      { title: "Miami Govt - Mayor's Page", url: "https://www.miamigov.com/My-Government/Mayor-Francis-Suarez" },
      { title: "Ballotpedia", url: "https://ballotpedia.org/Francis_Suarez" }
    ],
    votingHistory: [
      { bill: "Miami Forever Bond (Climate)", vote: "Supported", status: "Passed" },
      { bill: "MiamiCoin Partnership", vote: "Proposed", status: "Discontinued" }
    ]
  },

  // NEW YORK
  {
    id: 'chuckschumer', name: 'Chuck Schumer', state: 'NY', role: 'Senator', party: 'Democrat', level: 'Federal',
    isRunning: true,
    scores: { econ: -4, social: -6, gov: 5 },
    approval: 49,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chuck_Schumer_official_photo.jpg/500px-Chuck_Schumer_official_photo.jpg",
    bio: "Senate Majority Leader and senior senator from New York.",
    rationale: "Shepherded CHIPS and Science Act, negotiated bipartisan infrastructure deal.",
    stances: ["Infrastructure", "Job Creation", "Voting Rights"],
    career: [
      "Senate Majority Leader (2021–Present)",
      "U.S. House of Representatives (1981–1999)",
      "New York State Assembly"
    ],
    education: [
      "Harvard Law School (J.D.)",
      "Harvard College (A.B.)"
    ],
    sources: [
      {
        title: "CHIPS and Science Act Summary", url:
          "https://www.commerce.gov/news/fact-sheets/2022/08/chips-and-science-act-will-lower-costs-create-jobs-strengthen-supply-chains"
      },
      { title: "Congress.gov Profile", url: "https://www.congress.gov/member/charles-schumer/S000148" }
    ],
    votingHistory: [
      { bill: "Respect for Marriage Act", vote: "Yea", status: "Passed" },
      { bill: "Bipartisan Safer Communities Act", vote: "Yea", status: "Passed" },
      { bill: "Inflation Reduction Act", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'kirstengillibrand', name: 'Kirsten Gillibrand', state: 'NY', role: 'Senator', party: 'Democrat', level: 'Federal',
    isRunning: true,
    scores: { econ: -5, social: -7, gov: 4 },
    approval: 44,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kirsten_Gillibrand_official_portrait_112th_Congress.jpg/500px-Kirsten_Gillibrand_official_portrait_112th_Congress.jpg",
    bio: "Junior Senator from New York, focused on family and armed services issues.",
    rationale: "Led reform on military sexual assault justice, advocates for postal banking.",
    stances: ["Paid Family Leave", "Military Justice", "Healthcare"],
    career: [
      "U.S. House of Representatives (2007–2009)",
      "Attorney, Boies Schiller Flexner",
      "Law Clerk, Second Circuit Court of Appeals"
    ],
    education: [
      "UCLA School of Law (J.D.)",
      "Dartmouth College (B.A.)"
    ],
    sources: [
      {
        title: "Military Justice Improvement Act", url:
          "https://www.gillibrand.senate.gov/news/press-releases/gillibrand-statement-on-historic-military-justice-reforms-included-in-ndaa/"
      },
      { title: "Vote Smart", url: "https://justfacts.votesmart.org/candidate/65147/kirsten-gillibrand" }
    ],
    votingHistory: [
      { bill: "Military Justice Improvement Act", vote: "Sponsor", status: "Passed in NDAA" },
      { bill: "Postal Banking Act", vote: "Sponsor", status: "Pending" },
      { bill: "Electoral Count Reform Act", vote: "Yea", status: "Passed" }
    ]
  },
  {
    id: 'ericadams', name: 'Eric Adams', state: 'NY', role: 'Mayor (NYC)', party: 'Democrat', level: 'Local',
    isRunning: true,
    scores: { econ: -2, social: -4, gov: 5 },
    approval: 38,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Eric_Adams_official_portrait.jpg/500px-Eric_Adams_official_portrait.jpg",
    bio: "Mayor of New York City and retired police officer.",
    rationale: "Reinstated plainclothes police units, mandated involuntary hospitalization for severe mental illness.",
    stances: ["Public Safety", "Economic Recovery", "Urban Health"],
    career: [
      "Brooklyn Borough President (2014–2021)",
      "New York State Senate (2006–2013)",
      "Captain, NYPD (Retired)"
    ],
    education: [
      "Marist College (M.P.A.)",
      "John Jay College of Criminal Justice (B.A.)"
    ],
    sources: [
      {
        title: "NYC.gov - Mental Health Plan", url:
          "https://www.nyc.gov/office-of-the-mayor/news/870-22/mayor-adams-plan-provide-care-individuals-suffering-untreated-severe-mental"
      },
      { title: "Official Mayor Biography", url: "https://www.nyc.gov/office-of-the-mayor/bio.page" }
    ],
    votingHistory: [
      { bill: "City of Yes (Zoning)", vote: "Proposed", status: "Pending" },
      { bill: "Involuntary Hospitalization Directive", vote: "Issued", status: "Active" }
    ]
  },
  {
    id: 'kathyhochul', name: 'Kathy Hochul', state: 'NY', role: 'Governor', party: 'Democrat', level: 'State',
    isRunning: true,
    scores: { econ: -3, social: -5, gov: 4 },
    approval: 50,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kathy_Hochul_official_portrait.jpg/500px-Kathy_Hochul_official_portrait.jpg",
    bio: "Governor of New York, prioritizing economic development and housing.",
    rationale: "Proposed 'New York Housing Compact' to increase supply, fast-tracked Micron chip plant.",
    stances: ["Housing Affordability", "Public Transit", "Reproductive Rights"],
    career: [
      "Lieutenant Governor of New York (2015–2021)",
      "U.S. House of Representatives (2011–2013)",
      "County Clerk, Erie County"
    ],
    education: [
      "Catholic University of America (J.D.)",
      "Syracuse University (B.A.)"
    ],
    sources: [
      {
        title: "NY Housing Compact Press Release", url:
          "https://www.governor.ny.gov/news/governor-hochul-announces-statewide-strategy-address-new-yorks-housing-crisis-and-build-800000"
      },
      {
        title: "Micron Announcement", url:
          "https://www.governor.ny.gov/news/governor-hochul-announces-micron-will-invest-100-billion-bring-leading-edge-memory-manufacturing"
      }
    ],
    votingHistory: [
      { bill: "Concealed Carry Improvement Act", vote: "Signed", status: "Enacted" },
      { bill: "Clean Slate Act", vote: "Signed", status: "Enacted" },
      { bill: "Tier 6 Pension Reform", vote: "Signed", status: "Enacted" }
    ]
  },
];

const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
];

// -----------------------------------------------------------------------------
// HELPER COMPONENTS
// -----------------------------------------------------------------------------

// Helper to get flag URL from flagcdn
// Using w80 for better resolution/crispness on retina screens
const getFlagUrl = (code) => {
  if (code === 'National') return "https://flagcdn.com/w80/us.png";
  return `https://flagcdn.com/w80/us-${code.toLowerCase()}.png`;
};

// Helper to determine state from zip code (Mock Implementation for demo)
const getStateFromZip = (zip) => {
  const n = parseInt(zip, 10);
  if (n >= 10000 && n <= 14999) return 'NY'; // New York
  if (n >= 1000 && n <= 2799) return 'MA'; // Massachusetts
  if (n >= 5000 && n <= 5999) return 'VT'; // Vermont
  if (n >= 32000 && n <= 34999) return 'FL'; // Florida
  if (n >= 75000 && n <= 79999) return 'TX'; // Texas
  if (n >= 90000 && n <= 96199) return 'CA'; // California
  if (n >= 40000 && n <= 42799) return 'KY'; // Kentucky
  if (n >= 24700 && n <= 26899) return 'WV'; // West Virginia
  if (n >= 84000 && n <= 84799) return 'UT'; // Utah
  return null;
};

// NEW: Custom Select Component for Regions with Flags
const RegionSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Find current label
  const currentLabel = value === 'National'
    ? 'National'
    : US_STATES.find(s => s.code === value)?.name || value;

  const isOhio = value === 'OH';

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white border border-slate-300 rounded-xl
                                            text-slate-700 flex items-center justify-between focus:ring-2
                                            focus:ring-blue-500 outline-none font-medium hover:border-blue-400
                                            transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-5 flex items-center justify-center shrink-0
                                                    ${isOhio ? ''
              : 'rounded overflow-hidden shadow-sm bg-slate-50 border border-slate-200'
            }`}>
            <img src={getFlagUrl(value)} alt="" className={`w-full h-full
                                                        ${isOhio ? 'object-contain drop-shadow-sm' : 'object-cover'
              }`} />
          </div>
          <span className="truncate">{currentLabel}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform
                                                duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Backdrop for click-outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
          {/* National Option */}
          <div onClick={() => {
            onChange({ target: { value: 'National' } });
            setIsOpen(false);
          }}
            className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3
                                                border-b border-slate-100 transition-colors"
          >
            <div
              className="w-8 h-5 rounded overflow-hidden shadow-sm flex items-center justify-center bg-slate-50 shrink-0 border border-slate-200">
              <img src={getFlagUrl('National')}
                className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-slate-700">National</span>
          </div>

          {/* States Header */}
          <div
            className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 sticky top-0 border-b border-slate-100">
            States
          </div>

          {/* State Options */}
          {US_STATES.map(state => {
            const isOhioState = state.code === 'OH';
            return (
              <div key={state.code} onClick={() => {
                onChange({
                  target: {
                    value: state.code
                  }
                }); setIsOpen(false);
              }}
                className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3
                                                transition-colors"
              >
                <div className={`w-8 h-5 flex items-center justify-center shrink-0
                                                    ${isOhioState ? ''
                    : 'rounded overflow-hidden shadow-sm bg-slate-50 border border-slate-200'
                  }`}>
                  <img src={getFlagUrl(state.code)} alt={state.name}
                    className={`w-full h-full ${isOhioState
                      ? 'object-contain drop-shadow-sm' : 'object-cover'}`}
                    loading="lazy" />
                </div>
                <span className="text-sm text-slate-700">{state.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

const Tooltip = ({ text }) => {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <div className="group relative inline-block ml-2">
      <button type="button" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSticky(!isSticky);
      }}
        className="focus:outline-none flex items-center"
      >
        <Info size={14} className={`cursor-pointer transition-colors ${isSticky
          ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400'}`} />
      </button>
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2
                                            bg-gray-800 text-white text-xs rounded shadow-lg z-50 text-center
                                            pointer-events-none ${isSticky ? 'block' : 'hidden group-hover:block'}`}>
        {text}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800">
        </div>
      </div>
    </div>
  );
};

// NEW: Component for interactive definitions of slider terms with alignment and CITATION
const DefinitionLabel = ({ term, definition, source, alignment = 'center' }) => (
  <div
    className="group relative cursor-help inline-block border-b border-dotted border-slate-300 hover:border-slate-500 transition-colors">
    <span>{term}*</span>
    <div className={`absolute bottom-full mb-2 hidden group-hover:block w-40 p-2
                                            bg-slate-800 text-white text-[10px] rounded shadow-lg z-50 text-center
                                            font-normal normal-case tracking-normal leading-tight ${alignment === 'left'
        ? 'left-0' : alignment === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
      }`}>
      {definition}
      {source && (
        <div
          className="mt-2 pt-1 border-t border-slate-700 text-[8px] text-slate-400 font-light">
          Source: {source}
        </div>
      )}
      <div className={`absolute top-full border-4 border-transparent
                                                border-t-slate-800 ${alignment === 'left' ? 'left-4' :
          alignment === 'right' ? 'right-4' : 'left-1/2 -translate-x-1/2'}`}></div>
    </div>
  </div>
);

const ProgressBar = ({ label, userVal, polVal, colorClass, leftLabel, rightLabel }) => {
  const toPercent = (val) => ((val + 10) / 20) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
        <span>{leftLabel}</span>
        <span className="text-gray-700 font-bold">{label}</span>
        <span>{rightLabel}</span>
      </div>
      <div
        className="relative h-4 bg-gray-200 rounded-full w-full overflow-hidden group hover:bg-gray-300 transition-colors">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400 z-0">
        </div>
        <div className={`absolute top-0 bottom-0 w-1.5 h-full ${colorClass}
                                                opacity-60 z-10 transition-all duration-500`} style={{
            left:
              `${toPercent(polVal)}%`
          }}></div>
        <div className="absolute top-0 bottom-0 w-3 h-3 rounded-full bg-gray-800 border-2 border-white shadow-sm z-20 mt-0.5 transition-all duration-300"
          style={{ left: `calc(${toPercent(userVal)}% - 6px)` }}></div>
      </div>
      <div
        className="flex justify-between text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-800 rounded-full"></div> You
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 ${colorClass}`}></div> Them
        </div>
      </div>
    </div>
  );
};

// Reusable Control Component for both Input Screen and Sidebar
const CompassControls = ({ userProfile, setUserProfile, getIdeologyLabel, compact =
  false }) => {
  const handleSliderChange = (axis, value) => {
    setUserProfile(prev => ({ ...prev, [axis]: parseInt(value) }));
  };

  return (
    <div className={`space-y-6 ${compact ? ''
      : 'lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'}`}>

      {/* ECONOMY SLIDER */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label
            className="font-semibold text-slate-800 flex items-center text-sm">
            Economic Policy
            {!compact &&
              <Tooltip
                text="How should resources be distributed? Left = Planned/Social, Right = Market/Capital." />
            }
          </label>
          <span className={`text-[10px] font-bold px-2 py-1 rounded
                                                    ${userProfile.econ < 0 ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'}`}>
            {getIdeologyLabel(userProfile.econ, "Socialist", "Capitalist",
              "Mixed")}
          </span>
        </div>
        <input type="range" min="-10" max="10" step="1" value={userProfile.econ}
          onChange={(e) => handleSliderChange('econ', e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                            accent-blue-600"
        />
        <div
          className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          <DefinitionLabel term="Planned"
            definition="Society relies on public ownership. Leads to stronger safety nets and equality, but may limit private business and consumer choice."
            source="Investopedia: Command Economy" alignment="left" />
          <DefinitionLabel term="Market"
            definition="Society relies on private competition. Encourages innovation and efficiency, but can lead to wealth inequality and fewer public services."
            source="Investopedia: Free Market" alignment="right" />
        </div>
      </div>

      {/* SOCIAL SLIDER */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label
            className="font-semibold text-slate-800 flex items-center text-sm">
            Social Values
            {!compact &&
              <Tooltip
                text="Cultural & Moral Structures. Left = Progressive/Change, Right = Tradition/Conservation." />
            }
          </label>
          <span className={`text-[10px] font-bold px-2 py-1 rounded
                                                    ${userProfile.social < 0 ? 'bg-green-100 text-green-700'
              : 'bg-purple-100 text-purple-700'}`}>
            {getIdeologyLabel(userProfile.social, "Progressive", "Conservative",
              "Moderate")}
          </span>
        </div>
        <input type="range" min="-10" max="10" step="1" value={userProfile.social}
          onChange={(e) => handleSliderChange('social', e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                            accent-purple-600"
        />
        <div
          className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          <DefinitionLabel term="Progressive"
            definition="Society reforms institutions to fix inequality. Fosters inclusivity and change, but challenges established cultural norms."
            source="Pew Research: Political Typology" alignment="left" />
          <DefinitionLabel term="Traditional"
            definition="Society upholds time-tested values. Maintains cultural stability and continuity, but may resist social change or new lifestyles."
            source="Pew Research: Political Typology" alignment="right" />
        </div>
      </div>

      {/* GOV STRENGTH SLIDER */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label
            className="font-semibold text-slate-800 flex items-center text-sm">
            Gov Power
            {!compact &&
              <Tooltip
                text="Scope of state power. Left = Individual Liberty, Right = State Authority." />
            }
          </label>
          <span className={`text-[10px] font-bold px-2 py-1 rounded
                                                    ${userProfile.gov < 0 ? 'bg-yellow-100 text-yellow-700'
              : 'bg-slate-200 text-slate-700'}`}>
            {getIdeologyLabel(userProfile.gov, "Libertarian", "Authoritarian",
              "Statist")}
          </span>
        </div>
        <input type="range" min="-10" max="10" step="1" value={userProfile.gov}
          onChange={(e) => handleSliderChange('gov', e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                            accent-slate-800"
        />
        <div
          className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          <DefinitionLabel term="Liberty"
            definition="Society maximizes individual freedom. Promotes autonomy and deregulation, but may reduce social safety nets and public protections."
            source="Stanford Encyclopedia of Philosophy" alignment="left" />
          <DefinitionLabel term="Authority"
            definition="Society prioritizes order and security. Ensures strict rule enforcement and stability, often at the cost of personal privacy."
            source="Britannica: Authoritarianism" alignment="right" />
        </div>
      </div>
    </div>
  );
};

// NEW: Detail View for Selected Politician
const PoliticianDetail = ({ politician, userProfile, onBack }) => {
  const [question, setQuestion] = useState('');
  const [questionStatus, setQuestionStatus] = useState('idle'); // idle, submitting, success

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setQuestionStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setQuestionStatus('success');
      setQuestion('');
      // Reset after 3 seconds
      setTimeout(() => setQuestionStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-4">
        <ArrowLeft size={16} /> Back to Results
      </button>

      {/* Header Profile Card */}
      <div
        className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
        <div
          className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">

          {/* Avatar - Updated to show image always in detail view or just
                                                initials if image fails, but here we assume image exists */}
          <div
            className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl shrink-0">
            {/* Fallback Initials Layer */}
            <div className={`absolute inset-0 flex items-center justify-center
                                                        text-4xl font-bold text-white ${politician.party === 'Democrat'
                ? 'bg-blue-500' : politician.party === 'Republican' ? 'bg-red-500'
                  : 'bg-purple-500'}`}>
              {politician.name.split(' ').map(n => n[0]).join('')}
            </div>
            {/* Image Layer */}
            <img src={politician.imageUrl} alt={politician.name} onError={(e) => { e.target.style.display = 'none'; }}
              className="absolute inset-0 w-full h-full object-cover bg-slate-100"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {politician.name}</h2>
            <div
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                                                            uppercase tracking-wide border
                                                            ${politician.party === 'Democrat'
                  ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  politician.party === 'Republican'
                    ? 'bg-red-50 text-red-700 border-red-100'
                    : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                {politician.party}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-slate-100 text-slate-600 border-slate-200">
                {politician.role}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1">
                <MapPin size={12} /> {politician.state}
              </span>
            </div>
            <p className="text-slate-600 max-w-2xl">{politician.bio}</p>
          </div>

          <div
            className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[120px]">
            <div className={`text-4xl font-black ${politician.matchPercentage >=
              80 ? 'text-green-600' :
              politician.matchPercentage >= 60 ? 'text-yellow-600' :
                politician.matchPercentage >= 40 ? 'text-orange-500' :
                  'text-red-600'
              }`}>
              {politician.matchPercentage}%
            </div>
            <div
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">
              Match Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Alignment Breakdown */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3
              className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <Scale size={20} className="text-blue-500" /> Alignment
              Breakdown
            </h3>
            <div className="space-y-2">
              <ProgressBar label="Economics" leftLabel="Social"
                rightLabel="Capital" userVal={userProfile.econ}
                polVal={politician.scores.econ} colorClass="bg-blue-500" />
              <ProgressBar label="Social Values" leftLabel="Prog"
                rightLabel="Trad" userVal={userProfile.social}
                polVal={politician.scores.social}
                colorClass="bg-purple-500" />
              <ProgressBar label="Gov Power" leftLabel="Lib" rightLabel="Auth"
                userVal={userProfile.gov} polVal={politician.scores.gov}
                colorClass="bg-slate-600" />
            </div>
          </div>

          {/* Credentials & History Section */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3
              className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-slate-600" /> Credentials &
              History
            </h3>

            <div className="space-y-6">
              {politician.career && (
                <div>
                  <h4
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Public Service & Career</h4>
                  <ul className="space-y-2">
                    {politician.career.map((item, i) => (
                      <li key={i}
                        className="text-sm text-slate-700 flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0">
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {politician.education && (
                <div>
                  <h4
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap size={14} /> Education
                  </h4>
                  <ul className="space-y-2">
                    {politician.education.map((item, i) => (
                      <li key={i}
                        className="text-sm text-slate-700 flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0">
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* NEW: VOTING HISTORY SECTION */}
          {politician.votingHistory && (
            <div
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h3
                className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
                <Gavel size={20} className="text-slate-600" />
                Recent Voting Record
                <Tooltip
                  text="Includes key votes on major economic, social, and government policy bills from the last 4 years." />
              </h3>
              <div className="space-y-4">
                {politician.votingHistory.map((record, index) => (
                  <div key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className="p-2 bg-slate-50 rounded-lg text-slate-400 shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span
                          className="font-medium text-sm text-slate-800 truncate pr-2"
                          title={record.bill}>{record.bill}</span>
                        <span
                          className="text-[10px] text-slate-400 uppercase tracking-wide">{record.status}</span>
                      </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-bold
                                                                border shrink-0 ${record.vote === 'Yea' ||
                        record.vote === 'Supported' || record.vote === 'Signed' ||
                        record.vote === 'Sponsor'
                        ? 'bg-green-50 text-green-700 border-green-100' :
                        record.vote === 'Nay' || record.vote === 'Opposed'
                          ? 'bg-red-50 text-red-700 border-red-100'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                      {record.vote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citations/Sources - NEW SECTION */}
          {politician.sources && (
            <div
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-start mb-4">
                <h3
                  className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-slate-500" /> Sources &
                  Citations
                </h3>
                <div
                  className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-md text-[10px] font-bold uppercase border border-green-100">
                  <Shield size={12} /> Data Verified
                </div>
              </div>
              <ul className="space-y-3">
                {politician.sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.url} target="_blank" rel="noreferrer"
                      className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-50">
                      <span
                        className="font-medium truncate pr-2">{source.title}</span>
                      <ExternalLink size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Public Opinion */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3
              className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <Users size={20} className="text-green-500" /> Public Opinion
            </h3>

            <div className="mb-2 flex justify-between items-end">
              <span
                className="text-3xl font-bold text-slate-800">{politician.approval}%</span>
              <span className="text-sm text-slate-500 mb-1">Approval
                Rating</span>
            </div>

            <div
              className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
              <div style={{ width: `${politician.approval}%` }}
                className="bg-green-500 h-full"></div>
              <div style={{ width: `${100 - politician.approval}%` }}
                className="bg-red-400 h-full"></div>
            </div>

            <div className="flex justify-between mt-2 text-xs font-medium">
              <div className="flex items-center gap-1 text-green-700">
                <ThumbsUp size={12} /> Approve
              </div>
              <div className="flex items-center gap-1 text-red-700">Disapprove
                <ThumbsDown size={12} />
              </div>
            </div>
          </div>

          {/* Stances */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3
              className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-purple-500" /> Key Stances
            </h3>
            <div className="flex flex-wrap gap-2">
              {politician.stances && politician.stances.map((stance, i) => (
                <span key={i}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                  {stance}
                </span>
              ))}
            </div>
          </div>

          {/* Ask a Question Section */}
          <div
            className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3
              className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-blue-500" /> Ask about
              {politician.name}
            </h3>

            {questionStatus === 'success' ? (
              <div
                className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-in fade-in zoom-in-95">
                <div
                  className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                  <Check size={24} />
                </div>
                <h4 className="font-bold text-green-800 mb-1">Question Sent!
                </h4>
                <p className="text-sm text-green-700">We'll look into this and
                  update the data.</p>
              </div>
            ) : (
              <form onSubmit={handleAskQuestion}>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)}
                  disabled={questionStatus === 'submitting'}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-3 placeholder:text-slate-400"
                  rows="3"
                  placeholder={`What is their stance on...`}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={questionStatus === 'submitting' || !question.trim()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {questionStatus === 'submitting' ? 'Sending...' : 'Submit Question'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN APP COMPONENT
// -----------------------------------------------------------------------------

export default function App() {
  console.log('App component is rendering');
  const [step, setStep] = useState('onboarding'); // onboarding, inputs, results
  const [loading, setLoading] = useState(false);
  const [selectedPolitician, setSelectedPolitician] = useState(null); // New state for detail view
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  // Track if we are in the middle of a navigation flow (e.g. Onboarding -> Inputs)
  const [pendingStep, setPendingStep] = useState(null);

  // NEW: State for Input Modes selection
  const [inputModes, setInputModes] = useState({
    sliders: true,
    text: true,
    zipCode: false // NEW
  });

  const [userProfile, setUserProfile] = useState({
    location: 'National',
    level: 'All',
    econ: 0,
    social: 0,
    gov: 0,
    customViews: '',
    zipCode: '' // NEW
  });

  // Calculate matches reactively
  const matches = useMemo(() => {
    const results = POLITICIANS.filter(p => {
      // 1. Geographic Filter
      const isRegionMatch = userProfile.location === 'National' || p.state === userProfile.location;

      // 2. Level Filter
      const isLevelMatch = userProfile.level === 'All' ||
        p.level === userProfile.level ||
        (userProfile.level === 'District' && p.role.includes('Representative'));

      // 3. Active Candidate Filter
      // Only show politicians who are currently running for office/re-election
      const isRunningMatch = p.isRunning;

      return isRegionMatch && isLevelMatch && isRunningMatch;
    }).map(pol => {
      const deltaEcon = Math.pow(userProfile.econ - pol.scores.econ, 2);
      const deltaSoc = Math.pow(userProfile.social - pol.scores.social, 2);
      const deltaGov = Math.pow(userProfile.gov - pol.scores.gov, 2);

      const distance = Math.sqrt(deltaEcon + deltaSoc + deltaGov);
      const maxDistance = Math.sqrt(1200);
      const matchScore = Math.max(0, 100 - ((distance / maxDistance) * 100));

      return {
        ...pol,
        matchPercentage: Math.round(matchScore),
        details: { distance }
      };
    });

    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [userProfile]);

  const handleStartCalculation = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('results');
      setLoading(false);
    }, 800);
  };

  const getIdeologyLabel = (val, left, right, mid = "Centrist") => {
    if (val < -3) return left;
    if (val > 3) return right;
    return mid;
  };

  // Handle modal closing and optional navigation
  const handleModalClose = (action = 'close') => {
    setShowApiModal(false);

    // If we were waiting to navigate (e.g. from 'Start Assessment'), handle it now
    if (pendingStep) {
      if (action === 'proceed') {
        setStep(pendingStep);
      }
      // If action is 'cancel', we just stay on the current page (Onboarding)
      setPendingStep(null);
    }
  };

  // API Modal Component
  const ApiKeyModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Key size={20} className="text-blue-500" /> API Configuration
          </h3>
          <button
            onClick={() => handleModalClose('cancel')}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          Enter your CivicInfo or VoteSmart API key to fetch live data. <br />
          <span className="text-xs italic text-slate-400">(This demo currently uses mock data by default).</span>
        </p>
        <div className="relative mb-6">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API Key..."
            className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm"
          />
          <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <div className="flex justify-end gap-3">
          {/* Conditional Buttons based on context */}
          {pendingStep ? (
            <>
              <button
                onClick={() => handleModalClose('proceed')}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={() => handleModalClose('proceed')}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-slate-200"
              >
                Save & Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleModalClose('close')}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleModalClose('close')}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-slate-200"
              >
                Save Key
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // --- RENDER: ONBOARDING ---
  if (step === 'onboarding') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 relative">
        {showApiModal && <ApiKeyModal />}

        {/* Simple Navbar for Onboarding to access settings */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-end">
          <button
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium px-4 py-2 hover:bg-white rounded-full"
          >
            <Key size={16} /> API Settings
          </button>
        </div>

        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="bg-slate-900 p-12 md:w-2/5 flex flex-col justify-between text-white">
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-900/50">
                <Scale size={32} />
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">CivicAlign</h1>
              <p className="text-blue-200 text-lg leading-relaxed">Stop voting for colors. Start voting for values.</p>
            </div>
            <div className="mt-12 border-t border-slate-800 pt-6">
              <p className="text-xs text-slate-500 font-mono mb-2">© 2026 CIVICALIGN</p>
              <div className="flex gap-4 text-xs text-slate-400">
                <button className="hover:text-white transition-colors">Privacy</button>
                <button className="hover:text-white transition-colors">Terms</button>
                <button className="hover:text-white transition-colors">Contact</button>
              </div>
            </div>
          </div>
          <div className="p-12 md:w-3/5 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">How it works</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0"><Users size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">Values First</h3>
                  <p className="text-slate-500 mt-1">We compare your stance on 3 core axes against real voting records.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0"><MapPin size={24} /></div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">Local Focus</h3>
                  <p className="text-slate-500 mt-1">Filter by Federal, State, or Local levels to find representatives who affect your life.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setPendingStep('inputs');
                setShowApiModal(true);
              }}
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-100"
            >
              Start Assessment <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: INPUTS ---
  if (step === 'inputs') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative">
        {showApiModal && <ApiKeyModal />}

        {/* Simple Navbar for Inputs */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between max-w-5xl mx-auto">
          <button onClick={() => setStep('onboarding')} className="text-slate-400 hover:text-slate-600 font-bold flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={() => setShowApiModal(true)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium px-4 py-2 hover:bg-white rounded-full"
          >
            <Key size={16} /> API Settings
          </button>
        </div>

        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col mt-8"> {/* Removed overflow-hidden */}

          <div className="p-8 border-b border-slate-100 bg-white rounded-t-3xl">
            <h2 className="text-2xl font-bold text-slate-800">Your Political Compass</h2>
            <p className="text-slate-500">Define your coordinates to find your match.</p>
          </div>

          <div className="p-8 space-y-10">
            {/* LOCATION & LEVEL SELECT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <MapPin size={18} /> Select Your Region
                </label>
                <RegionSelect
                  value={userProfile.location}
                  onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Building2 size={18} /> Government Level
                </label>
                <select
                  value={userProfile.level}
                  onChange={(e) => setUserProfile({ ...userProfile, level: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none font-medium h-[52px]"
                >
                  <option value="All">All Levels</option>
                  <option value="Federal">Federal</option>
                  <option value="State">State</option>
                  <option value="Local">Local</option>
                  <option value="District">District</option>
                </select>
              </div>
            </div>

            {/* NEW: INPUT METHOD SELECTION */}
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" />
                Select Input Method:
              </span>
              <div className="flex gap-6 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inputModes.sliders ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                    {inputModes.sliders && <Check size={12} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={inputModes.sliders}
                    onChange={(e) => setInputModes(prev => ({ ...prev, sliders: e.target.checked }))}
                  />
                  <span className={`text-sm font-medium ${inputModes.sliders ? 'text-slate-800' : 'text-slate-500'}`}>Sliders</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inputModes.text ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                    {inputModes.text && <Check size={12} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={inputModes.text}
                    onChange={(e) => setInputModes(prev => ({ ...prev, text: e.target.checked }))}
                  />
                  <span className={`text-sm font-medium ${inputModes.text ? 'text-slate-800' : 'text-slate-500'}`}>Text Description</span>
                </label>

                {/* NEW: Zip Code Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inputModes.zipCode ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-400'}`}>
                    {inputModes.zipCode && <Check size={12} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={inputModes.zipCode}
                    onChange={(e) => setInputModes(prev => ({ ...prev, zipCode: e.target.checked }))}
                  />
                  <span className={`text-sm font-medium ${inputModes.zipCode ? 'text-slate-800' : 'text-slate-500'}`}>Zip Code</span>
                </label>
              </div>
            </div>

            {/* CONDITIONAL: SLIDERS GRID */}
            {inputModes.sliders && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <CompassControls
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  getIdeologyLabel={getIdeologyLabel}
                />
              </div>
            )}

            {/* CONDITIONAL: Natural Language Input */}
            {inputModes.text && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Edit size={16} /> Enter Your Preferences and Views Here
                </label>
                <textarea
                  value={userProfile.customViews}
                  onChange={(e) => setUserProfile({ ...userProfile, customViews: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] resize-y placeholder:text-slate-400"
                  placeholder="I believe in fiscal responsibility but socially liberal policies..."
                ></textarea>
              </div>
            )}

            {/* CONDITIONAL: Zip Code Input */}
            {(inputModes.zipCode || userProfile.level === 'Local') && (
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                <label
                  className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Hash size={16} /> Enter Your Zip Code
                </label>
                <input type="text" maxLength="5" value={userProfile.zipCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setUserProfile(prev => {
                      const newState = { ...prev, zipCode: val };
                      if (val.length === 5) {
                        const detectedState = getStateFromZip(val);
                        if (detectedState) {
                          newState.location = detectedState;
                          newState.level = 'District'; // Auto-set level to District on valid zip
                        }
                      }
                      return newState;
                    });
                  }}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl
                                                    text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none
                                                    placeholder:text-slate-400 font-mono tracking-widest"
                  placeholder="12345"
                />
                <p className="text-xs text-slate-400 mt-2 ml-1">
                  {userProfile.level === 'Local'
                    ? "Required for identifying specific city and county representatives."
                    : "Auto-detects your state and switches to District level representation."}
                </p>
              </div>
            )}

          </div>

          <div
            className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end rounded-b-3xl">
            <button onClick={handleStartCalculation} disabled={loading ||
              (!inputModes.sliders && !inputModes.text && !inputModes.zipCode)}
              className="bg-slate-900 hover:bg-black text-white font-bold py-4 px-12 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Calculating...' : 'Find Matches'}
              {!loading &&
                <BarChart3 size={20} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: RESULTS (DASHBOARD LAYOUT) ---
  return (
    <div className="min-h-screen bg-slate-100 font-sans relative">
      {showApiModal &&
        <ApiKeyModal />}

      {/* NAVBAR */}
      <nav
        className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Left Side: Back Button + Logo */}
          <div className="flex items-center gap-4">
            <button onClick={() => setStep('inputs')}
              className="flex items-center gap-2 text-slate-500
                                                        hover:text-blue-600 transition-colors font-medium text-sm"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Edit Inputs</span>
            </button>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setStep('onboarding');
                setSelectedPolitician(null);
              }}>
              <div
                className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Scale size={16} />
              </div>
              <span
                className="font-bold text-slate-900 text-xl tracking-tight">CivicAlign</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <User size={14} />
              <span>Voting as: <strong>{userProfile.location}
                Resident</strong></span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <button onClick={() => setShowApiModal(true)}
              className="flex items-center gap-2 text-slate-500
                                                        hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <Key size={16} />
              <span className="hidden sm:inline">API Key</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* SIDEBAR - CONTROLS */}
        <div className="lg:col-span-4 space-y-6">
          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-28">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <LayoutDashboard size={20} className="text-blue-600" />
              <h2 className="font-bold text-lg">Your Alignment</h2>
            </div>

            <div className="space-y-6">
              <div className="pb-6 border-b border-slate-100 space-y-4">
                <div>
                  <label
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Region</label>
                  <RegionSelect value={userProfile.location}
                    onChange={(e) => setUserProfile({
                      ...userProfile,
                      location: e.target.value
                    })}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gov
                    Level</label>
                  <select value={userProfile.level} onChange={(e) =>
                    setUserProfile({
                      ...userProfile, level:
                        e.target.value
                    })}
                    className="w-full p-2 bg-slate-50 border
                                                                    border-slate-200 rounded-lg text-sm text-slate-700
                                                                    outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Levels</option>
                    <option value="Federal">Federal</option>
                    <option value="State">State</option>
                    <option value="Local">Local</option>
                    <option value="District">District</option>
                  </select>
                </div>

                {/* Sidebar Zip Code Input */}
                {(inputModes.zipCode || userProfile.level === 'Local' ||
                  userProfile.level === 'District') && (
                    <div>
                      <label
                        className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Zip
                        Code</label>
                      <input type="text" maxLength="5"
                        value={userProfile.zipCode} onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setUserProfile(prev => {
                            const newState = { ...prev, zipCode: val };
                            if (val.length === 5) {
                              const detectedState = getStateFromZip(val);
                              if (detectedState) {
                                newState.location = detectedState;
                                // We don't force override level here in sidebar to avoid jarring UX,
                                // but we update state which filters naturally
                              }
                            }
                            return newState;
                          });
                        }}
                        className="w-full p-2 bg-slate-50 border
                                                                border-slate-200 rounded-lg text-sm text-slate-700
                                                                outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder="12345"
                      />
                    </div>
                  )}
              </div>

              {/* Only show CompassControls in sidebar if sliders were used,
                                                        otherwise show simple message or the text */}
              {inputModes.sliders ? (
                <CompassControls userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  getIdeologyLabel={getIdeologyLabel} compact={true} // Vertical layout for sidebar
                />
              ) : (
                <div
                  className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-lg border border-slate-100">
                  Using text-based alignment.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - EITHER LIST OR DETAIL */}
        <div className="lg:col-span-8 space-y-6">

          {/* CONDITIONAL RENDERING: DETAIL VIEW OR LIST VIEW */}
          {selectedPolitician ? (
            <PoliticianDetail politician={selectedPolitician}
              userProfile={userProfile} onBack={() => setSelectedPolitician(null)}
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Top
                    Active Candidates</h2>
                  <p className="text-sm text-slate-500 mt-1">Showing
                    active {userProfile.level === 'All' ? 'all' :
                      userProfile.level.toLowerCase()} candidates in
                    {userProfile.location}.</p>
                </div>
                <span
                  className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
                  Found {matches.length}
                </span>
              </div>

              <div className="space-y-4">
                {matches.length === 0 ? (
                  <div
                    className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-400">No politicians found for
                      this region/level combination.</p>
                    <button onClick={() => setUserProfile({
                      ...userProfile,
                      level: 'All'
                    })}
                      className="text-blue-500 underline mt-2 text-sm"
                    >
                      Clear Level Filter
                    </button>
                  </div>
                ) : (
                  matches.map((pol) => (
                    <div key={pol.id} onClick={() => setSelectedPolitician(pol)}
                      className="bg-white rounded-2xl shadow-sm border
                                                                border-slate-200 overflow-hidden hover:shadow-md
                                                                transition-all duration-300 group cursor-pointer ring-2
                                                                ring-transparent hover:ring-blue-100"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* LEFT: INFO */}
                        <div
                          className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-slate-50/30">
                          <div
                            className="flex items-center gap-4 mb-3 w-full justify-center md:justify-start">

                            {/* AVATAR WITH HOVER REVEAL */}
                            <div
                              className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0">
                              {/* Initials Layer (Visible by default,
                                                                                NO fade out on hover so it acts as
                                                                                fallback) */}
                              <div className={`absolute inset-0 flex
                                                                                    items-center justify-center text-2xl
                                                                                    font-bold text-white
                                                                                    ${pol.party === 'Democrat'
                                  ? 'bg-blue-500' :
                                  pol.party === 'Republican'
                                    ? 'bg-red-500' : 'bg-purple-500'
                                }`}>
                                {pol.name.split(' ').map(n =>
                                  n[0]).join('')}
                              </div>
                              {/* Image Layer (Hidden by default,
                                                                                visible on hover) */}
                              <img src={pol.imageUrl} alt={pol.name}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                                className="absolute inset-0 w-full
                                                                                h-full object-cover opacity-0
                                                                                transition-opacity duration-500
                                                                                ease-in-out group-hover:opacity-100
                                                                                bg-slate-100"
                              />
                            </div>

                            <div>
                              <div className={`text-3xl font-black ${pol.matchPercentage >= 80 ?
                                'text-green-600' :
                                pol.matchPercentage >= 60 ?
                                  'text-yellow-600' :
                                  pol.matchPercentage >= 40 ?
                                    'text-orange-500' :
                                    'text-red-600'
                                }`}>
                                {pol.matchPercentage}%
                              </div>
                              <div
                                className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                Match Score</div>
                            </div>
                          </div>

                          <h3
                            className="text-xl font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                            {pol.name}</h3>
                          <p
                            className="text-sm text-slate-500 font-medium">
                            {pol.role} • {pol.state}</p>

                          <div className="flex gap-2 mt-2">
                            <span className={`px-2.5 py-0.5 rounded
                                                                                text-[10px] font-bold uppercase
                                                                                tracking-wide border
                                                                                ${pol.party === 'Democrat'
                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                : pol.party === 'Republican'
                                  ? 'bg-red-50 text-red-700 border-red-100'
                                  : 'bg-purple-50 text-purple-700 border-purple-100'
                              }`}>
                              {pol.party}
                            </span>
                            <span
                              className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border bg-slate-100 text-slate-600 border-slate-200">
                              {pol.level}
                            </span>
                          </div>
                        </div>

                        {/* RIGHT: BARS */}
                        <div className="p-6 md:w-2/3 space-y-1">
                          <div className="grid grid-cols-1 gap-x-8">
                            {/* Econ */}
                            <ProgressBar label="Economics"
                              leftLabel="Social" rightLabel="Capital"
                              userVal={userProfile.econ}
                              polVal={pol.scores.econ}
                              colorClass="bg-blue-500" />

                            {/* Social */}
                            <ProgressBar label="Social Values"
                              leftLabel="Prog" rightLabel="Trad"
                              userVal={userProfile.social}
                              polVal={pol.scores.social}
                              colorClass="bg-purple-500" />

                            {/* Gov */}
                            <ProgressBar label="Gov Power"
                              leftLabel="Lib" rightLabel="Auth"
                              userVal={userProfile.gov}
                              polVal={pol.scores.gov}
                              colorClass="bg-slate-600" />
                          </div>

                          {/* Analysis Line - Swaps on Hover */}
                          <div
                            className="pt-2 mt-2 border-t border-slate-100 min-h-[24px]">

                            {/* Standard View: Match Status */}
                            <div
                              className="group-hover:hidden flex items-center justify-between h-auto py-1">
                              {pol.matchPercentage > 85 ? (
                                <div
                                  className="flex items-center gap-2 text-green-700 text-xs font-semibold">
                                  <CheckCircle2 size={14} /> Strong
                                  ideological alignment.
                                </div>
                              ) : pol.matchPercentage < 50 ? (<div
                                className="flex items-center gap-2 text-red-700 text-xs font-semibold">
                                <AlertCircle size={14} />
                                Significant value divergence.
                              </div>
                              ) : (
                                <div
                                  className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                                  <Info size={14} /> Moderate alignment.
                                </div>
                              )}
                            </div>

                            {/* Hover View: Full Rationale */}
                            <div
                              className="hidden group-hover:block animate-in fade-in duration-200 py-1">
                              <div
                                className="flex items-start gap-2 text-slate-600 text-xs mb-2">
                                <ScrollText size={14}
                                  className="text-blue-500 shrink-0 mt-0.5" />
                                <span
                                  className="font-medium leading-relaxed">{pol.rationale}</span>
                              </div>
                              <div
                                className="text-xs text-blue-500 font-bold flex items-center justify-end gap-1">
                                View Profile
                                <ChevronRight size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}