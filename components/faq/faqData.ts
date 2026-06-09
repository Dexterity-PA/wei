/**
 * FAQ content for the Wealth Equity Initiative. Grouped so the page reads like a
 * reference document rather than one long list. Copy rules: education framing
 * only, never positioned as regulated financial guidance; only the two verified
 * figures (5,000+ students, 40+ schools) may appear; no invented claims; no em
 * dashes.
 *
 * Answers are arrays of paragraphs.
 */

export type FaqItem = {
  q: string;
  a: string[];
};

export type FaqGroup = {
  id: string;
  /** Two-digit mono index shown in the section margin. */
  index: string;
  label: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "about",
    index: "01",
    label: "About WEI",
    items: [
      {
        q: "What is the Wealth Equity Initiative?",
        a: [
          "The Wealth Equity Initiative is a student-founded nonprofit that teaches practical financial literacy to students who would not otherwise get it. We build plain-language lessons, a glossary, and everyday money tools, and we bring them into classrooms.",
          "The starting assumption is simple: that no one at home has already explained how a paycheck, a bank account, or a loan actually works. We fill that gap with teaching, not with answers handed down from on high.",
        ],
      },
      {
        q: "Is WEI really free?",
        a: [
          "Yes. The lessons, the glossary, and the tools on this site are free to use, and bringing WEI to a school costs the school nothing. There is no paid tier and nothing to unlock.",
        ],
      },
      {
        q: "Who runs WEI?",
        a: [
          "WEI is student-led. It was founded and is run by students who saw the gap firsthand and decided to do something about it. We are honest about being young and still growing, and we would rather be useful and plain-spoken than polished and vague.",
        ],
      },
      {
        q: "Where does WEI operate?",
        a: [
          "The work began in India, in a cluster of schools across coastal Andhra Pradesh and Telangana, with one school in the far south at Nagercoil. You can see a representative sample of those schools on the Impact page.",
          "The mission is not tied to one country. India is where WEI started, and the toolkit on this site is one instance of a goal that travels: that financial knowledge should not depend on where a student was born.",
        ],
      },
      {
        q: "Why does WEI exist?",
        a: [
          "Because financial literacy too often depends on the household or the zip code a student was born into. Some students grow up hearing how money works at the dinner table. Many do not. WEI exists to make that knowledge available to the students who were never going to get it any other way.",
        ],
      },
    ],
  },
  {
    id: "tools",
    index: "02",
    label: "Using the tools",
    items: [
      {
        q: "What can I do with the tools and lessons?",
        a: [
          "You can work through guided lessons that build financial literacy step by step, look up plain-language definitions in the glossary, and use everyday calculators that show how the numbers behind a decision actually move.",
          "Everything is designed to help you reason through your own choices with your eyes open, rather than to make a choice for you.",
        ],
      },
      {
        q: "Do I need an account to use anything?",
        a: [
          "No. There is nothing to sign up for. You can open any lesson, glossary entry, or tool and use it right away.",
        ],
      },
      {
        q: "Do the calculators tell me what to do with my money?",
        a: [
          "No. The tools illustrate how things work. A calculator can show you how interest compounds or how a payment changes over time, but it does not know your situation and it will never tell you what decision to make. That part stays with you.",
        ],
      },
      {
        q: "Who are the lessons written for?",
        a: [
          "They are written for students who are meeting these ideas for the first time, and for anyone who wants money explained in plain language without jargon or assumptions. If a term needs defining, we define it.",
        ],
      },
      {
        q: "Does WEI work on a phone?",
        a: [
          "Yes. The lessons, glossary, and tools are built to be read and used on a phone as comfortably as on a laptop.",
        ],
      },
    ],
  },
  {
    id: "schools",
    index: "03",
    label: "For schools and educators",
    items: [
      {
        q: "How do I bring WEI to my school?",
        a: [
          "Reach out through the contact page and choose the educator path. Tell us a little about your school and your students, and we will follow up to work out what a session or a series could look like.",
        ],
      },
      {
        q: "What does WEI provide to a partner school?",
        a: [
          "Free lessons, the everyday money tools, and a plain-language curriculum, shaped to fit the time and the students you have. We bring the material and the structure so a teacher does not have to build a financial literacy unit from scratch.",
        ],
      },
      {
        q: "What is asked of a partner school?",
        a: [
          "Not much, and nothing financial. A point of contact, time with students, and a willingness to let us tailor the material to your classroom. We are student-led and still growing, so we are honest about working within that.",
        ],
      },
      {
        q: "Is WEI only available in India?",
        a: [
          "India is where the work started, and where the named schools are today. The mission travels, and we welcome conversations with schools and educators elsewhere who want to bring plain-language financial education to their students.",
        ],
      },
    ],
  },
  {
    id: "fine-print",
    index: "04",
    label: "The fine print",
    items: [
      {
        q: "Is WEI financial guidance?",
        a: [
          "No, and this is the one line worth stating plainly. WEI provides financial education, not regulated financial guidance. We explain how the tools work and what the terms mean so you can think clearly about your own decisions.",
          "We do not tell any individual what to do with their money, and we are not a substitute for a licensed professional. We hold that line on purpose, because teaching people to reason about money is more honest than handing them an answer and asking them to trust it.",
        ],
      },
      {
        q: "What happens to what I send through the contact form?",
        a: [
          "A message you send reaches the WEI team by email so we can read it and reply. We use it to respond to you and nothing else.",
        ],
      },
      {
        q: "Can I trust the figures WEI cites?",
        a: [
          "We hold ourselves to citing only what we can stand behind. The two figures you will see on the site, 5,000+ students and 40+ schools, are the verified numbers. We would rather under-claim than inflate, so we leave it at those.",
        ],
      },
      {
        q: "How do I get in touch with a question?",
        a: [
          "Use the contact page. Whether you are a student, a parent, an educator, or a school, your message reaches the team directly and we will get back to you.",
        ],
      },
    ],
  },
];
