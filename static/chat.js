const utterances = [
    ["hi!","hey","Heya","Hey","hello","Hello","HELLO","hi bot"],
    ["how are you","what's up"],
    ["cancer"],
    ["cost of cancer"],
    ["cause of cancer"],
    ["top hospitals for cancer"],
    
    ];
    
  const replies = [
    ["hi!","hey","Heya","Hey","hello","Hello","HELLO"],
    ["I'm good.How are you? Hope you are safe"],
    ["Cancer is a disease in which some of the body’s cells grow uncontrollably and spread to other parts of the body. "],
    ["The average cost of Cancer Treatment in India is INR Rs. 5,00,000. The maximum charge for Cancer Treatment in India is up to INR Rs. 27,50,000."],
    ["Tobacco use, alcohol consumption, unhealthy diet, physical inactivity and air pollution are risk factors for cancer and other noncommunicable diseases. Some chronic infections are risk factors for cancer; this is a particular issue in low- and middle-income countries."],
    ["Tata Memorial Hospital, Mumbai.All India Institute of Medical Sciences, New Delhi.The Cancer Institute, Adyar, Chennai.Apollo Speciality Hospital, Chennai. The Gujarat Cancer & Research Institute, Ahmedabad. Rajiv Gandhi Cancer Institute and Research Centre, Delhi."],
  
  ];
  const alternative = [
    "I am unable to process. PLEASE contact helpline in case of emergency. Helpline: 3056978241",
    "Sorry, I cannot understand. Please contact our professional for any emergency. Contact no: 9875632141 ; Helpline: 2220136974"
  ];
  const messagerForm = get(".messager-inbox");
  const messagerInput = get(".messager-input");
  const messagerChat = get(".messager-forchat");
  const logo_img = "tragiclogo.png";
  const logo_name = "Bot";
  const me_img = "person.jpg";
  const me_name = "Me";
  const robot = ["How do you do, fellow human", "I am not a bot"];
  messagerForm.addEventListener("submit", event => 
  {
    event.preventDefault();
    const msgText = messagerInput.value;
    if (!msgText) return;
    messagerInput.value = "";
    addChat(me_name, me_img, "right", msgText);
    output(msgText);
  });
  function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")  
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/there/g, "there is")
      .replace(/r u/g, "are you");
    if (compare(utterances, replies, text)) 
    {
      product = compare(utterances, replies, text);
    }
     else if (text.match(/thank/gi)) 
     {
      product = "You're welcome!"
    }
     else if (text.match(/(robot|bot|robo)/gi)) 
     {
      product = robot[Math.floor(Math.random() * robot.length)];
    }
     else 
     {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    const delay = input.split(" ").length * 100;
    setTimeout(() => {
      addChat(logo_name, logo_img, "left", product);
    }, delay);
  }
  function compare(utterancesArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < utterancesArray.length; x++) {
      for (let y = 0; y < utterancesArray[x].length; y++) {
        if (utterancesArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  }
  function addChat(name, img, side, text) {
    const msgHTML = `
      <div class="msg ${side}-msg">
      <div class="msg-pic" style="background-image: url(${img})"></div>
      <div class="msg-box">
      <div class="msg-maintitle">
      <div class="msg-maintitle-name">${name}</div>
      <div class="msg-info-time">${formatDate(new Date())}</div></div>
      <div class="msg-pop">${text}</div>
      </div>
      </div>
    `;
    messagerChat.insertAdjacentHTML("beforeend", msgHTML);
    messagerChat.scrollTop += 500;
  }
  function get(selector, root = document) {
    return root.querySelector(selector);
  }
  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }
  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }