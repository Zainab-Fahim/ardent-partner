//$ npm install --save firebase-admin
var admin = require("firebase-admin");
var serviceAccount = require("../assets/ardent-partner-firebase-adminsdk-4ye2u-9191a9b66a.protected.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db= admin.firestore();

exports.handler = async (context, event, callback) => {
 //twilio memory
  const memory = JSON.parse(event.Memory);

  // get product lists 
  const productRef = db.collection('product');
  let menuList=[];
  let shelfList=[];
  let allList=[]
  const productsnapshot = await productRef.get();
  productsnapshot.forEach(doc => {
    if(doc.data().status=='menu'){
      menuList.push(doc.data());
    }else{
      shelfList.push(doc.data());
    }
  });
  allList=menuList.concat(shelfList);

  const answerFields = memory.twilio.collected_data.order_details.answers;
  const quantity=answerFields.item_quantity.answer;
  const details=allList[parseInt(answerFields.item_name.answer)-1];

  const response={
    actions: [],
  };

  response.actions.push({
    say: `Here is your order so far:\n\n${details.name} (${quantity} ${details.measurement}) - ${quantity} x $${details.price}`,
  });

  let name_cust;
  let number_cust;

  const user = memory.twilio.chat
    ? memory.twilio.chat
    : memory.twilio["messaging.whatsapp"];
  if(user.From!=''){
    number_cust = user.From.split("+")[1];
    const custsnapshot = await db.collection('customer').where('contact', '==', number_cust).get();
    custsnapshot.forEach(doc => {
      name_cust=doc.data().name;
    })  
    if(name_cust)
    {
      response.actions.push({
        redirect: {
          method: "POST",
          uri: `https://${context.DOMAIN_NAME}/orderInvoice`,
        },
      })
    }else{
      response.actions.push({
        collect: {
          name: "cust_details",
          questions: [ 
            {
              question: `Welcome to EasyAsPie.\nSince you're a new customer, we would like to know your name?`,
              name: "Name",
              validate: false,
            },
            {
              question:
                "What is your phone number? We need this to contact you regarding (any) details and for identification.",
              name: "Contact",
              type: "Twilio.PHONE_NUMBER",
              validate: {
                on_failure: {
                  messages: [
                    {
                      say: "Please enter a valid phone number. We need this to contact you if regarding order details.",
                    },
                  ],
                  repeat_question: false,
                },
              },
            },
          ],
          on_complete: {
            redirect: {
              method: "POST",
              uri: `https://${context.DOMAIN_NAME}/orderInvoice`,
            },
          },
        },
      });
    }
  }
  else
  {
    response.actions.push({
      collect: {
        name: "cust_details",
        questions: [ 
          {
            question: `Welcome to EasyAsPie.\nSince you're a new customer, we would like to know your name?`,
            name: "Name",
            validate: false,
          },
          {
            question:
              "What is your phone number? We need this to contact you regarding (any) details and for identification.",
            name: "Contact",
            type: "Twilio.PHONE_NUMBER",
            validate: {
              on_failure: {
                messages: [
                  {
                    say: "Please enter a valid phone number. We need this to contact you if regarding order details.",
                  },
                ],
                repeat_question: false,
              },
            },
          },
        ],
        on_complete: {
          redirect: {
            method: "POST",
            uri: `https://${context.DOMAIN_NAME}/orderInvoice`,
          },
        },
      },
    });
  }
  callback(null, response);
};
