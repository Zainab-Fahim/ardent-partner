//$ npm install --save firebase-admin
var admin = require("firebase-admin");
var serviceAccount = require("../assets/ardent-partner-firebase-adminsdk-4ye2u-9191a9b66a.protected.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db= admin.firestore();

exports.handler = async (context, event, callback) => {
 //twilio memory
 //twilio memory
  const memory = JSON.parse(event.Memory);
  const user = memory.twilio.chat
  ? memory.twilio.chat
  : memory.twilio["messaging.whatsapp"];

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

  //get order details
  const orderResponse = memory.twilio.collected_data.order_details.answers;
  const quantity=orderResponse.item_quantity.answer;
  const details=allList[parseInt(orderResponse.item_name.answer)-1];

  let cust_name;
  let cust_number;
  let custResponse;

  let custNum;
  async function storeCustDets(cust_number,cust_name){
    await db.collection('customer').get().then((querySnapshot) => custNum=querySnapshot.size);
    const custRes = await db.collection('customer').doc(`${custNum+1}`).set({
      name:cust_name,
      contact:`${cust_number}`,
    });
  }

  if(user.From!='' ){
    cust_number = user.From.split("+")[1];
    const custsnapshot = await db.collection('customer').where('contact', '==', cust_number).get();
    custsnapshot.forEach(doc => {
      cust_name=doc.data().name;
    })  
    if(!cust_name)
    {
      custResponse = memory.twilio.collected_data.cust_details.answers;
      cust_name=custResponse.Name.answer;
      await storeCustDets(cust_number,cust_name);
    }
  }else{
    custResponse = memory.twilio.collected_data.cust_details.answers;
    cust_number=custResponse.Contact.answer;
    cust_name=custResponse.Name.answer;
    await storeCustDets(cust_number,cust_name);
  }




  
  let orderSize;
  let invoice_formatted;
  let invoice_pickup;
  let invoice_bye;
  var currentdate = new Date(); 
  var order_date = `${currentdate.getDate()}/${(currentdate.getMonth()+1)}/${currentdate.getFullYear()}`;
  var order_time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  const getOrderSize= await db.collection('order').get();
  orderSize=getOrderSize.size+1;
  await db.collection('order').doc(`${orderSize}`).set({
    customer: {
      name: cust_name,
      contact: cust_number
    },
    item:[
      {
        measurement: details.measurement,
        name: details.name,
        price: details.price,
        quantity: quantity,
        status: details.status,
      }
    ],
    status: "pending",
    type: details.status=="menu" ? "menu" : "off-the-shelf",
    total: details.price*quantity,
    timepoint:{
      date: order_date, 
      time: order_time
    },
  });
  // get order from database
  const getNewOrder = await db.collection('order').doc(`${orderSize}`).get();
  if (!getNewOrder.exists) 
  {
    console.log('No such document!');
  } 
  else 
  {
    var orderDoc=getNewOrder.data();
    var custName=orderDoc.customer.name;
    var custNumber=orderDoc.customer.contact;
    var orderType=orderDoc.type;
    var orderStatus=orderDoc.status;
    var orderID=orderSize;
    var itemList=orderDoc.item
    invoice_formatted=`Here is the final invoice of your order: \n\nOrder No. ${orderID}\nName : ${custName}\nContact Number : ${custNumber}\nOrder List :\n${itemList.map((item,index)=>`${index+1}. ${item.name} (${item.quantity} ${item.measurement}) - ${item.quantity} x $${item.price}`).join("\n")}\n\n*Total - $${orderDoc.total}*\n\n`;
    invoice_pickup=`Since your order type is ${orderType}, the order is ${orderStatus} and will be available for pickup ${orderType=="menu"?"10-24 hrs":"immediately"}.`;
    invoice_bye=`Thank You for shopping with us. Hope to be of service in the future as well. Have a great day ${custName}!`;
  }
  
  callback(null, {
    actions: [
      {
        say: invoice_formatted,
      },
      {
        say: invoice_pickup,
      },
      {
        say:  invoice_bye,
      },
    ],
  });

};
