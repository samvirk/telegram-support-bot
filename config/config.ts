const config = {
  // bot settings
  bot_token: 'BOT_TOKEN', // support bot token
  staffchat_id: 'STAFFCHAT_ID', // eg. -123456789
  owner_id: 'OWNER_ID',
  spam_time: 5 * 60 * 1000, // time (in MS) in which user may send 5 messages
  allow_private: true, // Allow / disallow option for staff to chat privately
  auto_close_tickets: true,
  direct_reply: true,
  anonymous_tickets: false, //Include userid in tickets or not

  // customize your language
  language: {
    startCommandText: "Velkommen til Samvirk Support!\n" +
    "Vi er her for å svare på det du lurer på om SAMVIRK! Fyr løs med spørsmål, men sjekk gjerne om svaret ditt allerede finnes på https://my.samvirk.com/FAQ.\n\n" +
    "// \n\n" +
    "Welcome to Samvirk Support!\n" +
    "We're here to answer all your questions about SAMVIRK! Come with it, but please check https://my.samvirk.com/FAQ to see if your question is already answered there.",
    faqCommandText: 'Les mer på https://my.samvirk.com/FAQ',
    helpCommandText: 'Bare skriv et spørsmål til oss her i bot-en, så vil du få et svar fra oss.\n\nJust write a question to this bot, and you will get an answer from us.\n\n<b>Tilgjengelige kommandoer / Available commands:</b>\n/help\n/faq',
    contactMessage: 'Takk for meldingen. Du hører fra oss så snart som mulig.\n\nThank you for contacting us. We will answer as soon as possible.',
    blockedSpam: 'You sent quite a number of questions in the last while. Please wait until staff reviews them.',
    ticket: 'Ticket',
    closed: 'closed',
    acceptedBy: 'was accepted by',
    dear: 'Hei',
    regards: 'Vennlig hilsen / Best regards,',
    from: 'from',
    language: 'Language',
    msg_sent: 'Message sent to user',
    file_sent: 'File sent to user',
    usr_with_ticket: 'User with ticket',
    banned: 'banned',
    replyPrivate: 'Reply in private',
    services: 'Select a service from the list below',
    customer: 'customer',
    msgForwarding: 'You messages will now be forwarded to vendors of the group: ',
    back: 'Go back',
    whatSubCategory: 'Which subcategory describes your needs the best? ',
    prvChatEnded: 'Private chat ended.',
    prvChatOpened: 'Private Chat opened with customer.',
    prvChatEnd: 'End Private chat',
    prvChatOpenedCustomer: 'Opened private chat',
    instructionsSent: 'Instructions were sent to you in private chat.',
    openTickets: 'Open Tickets',
    support: 'Support',
    prvChatOnly: 'This command can be used in private chat only.',
    ticketClosed: 'Spørsmålet ditt ble merket som besvart. Dersom du fremdeles lurer på noe, kan du gjerne stille et nytt spørsmål.\n\nYour question was marked as resolved. If you still have any questions, please feel free to ask them here.',
    links: 'Direct support links',
    textFirst: 'Vennligst send oss et spørsmål før du sender et bilde. Da er det enklere for oss å hjelpe deg.\n\nPlease send us a message before sending an image so that we can help you better.',
    ticketClosedError: 'You cannot reply to a closed ticket.',
    automatedReply: 'This is an automated reply.',
    automatedReplyAuthor: 'BottyBot.',
    doesntHelp: 'This does not help.',
    automatedReplySent: 'Automated reply was send to the user.',
  },

  categories: [],
  /* <==== Remove this line if you want categories ====>
  categories:
    [
      {
        name: 'Category1', subgroups: [
          {name: 'Sub1', group_id: '-12345678910'},
          {name: 'Sub2', group_id: '-12345678910'},
          {name: 'Sub3', group_id: '-12345678910'},
        ],
      },
      {
        name: 'Category2', subgroups: [
          {name: 'Sub4', group_id: '-12345678910'},
          {name: 'Sub5', group_id: '-12345678910'},
          {name: 'Sub6', group_id: '-12345678910'},
        ],
      },
      {
        name: 'Category with no subcategories', group_id: '-12345678910'
      },
      {
        name: 'Admin Chat', group_id: '-12345678910' 
      },
      {
        name: 'Contact', msg: 'Check out our Website'
      },
    ],
   /* <==== Remove this line if you want categories ====> */
};

export default config;
  
