let addressBookObj={};
let isUpdate = false;

window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        let names = document.querySelector('#name').value.split(" ");
        if (names[0].length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new AddressBook()).fullName = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    })

    const addressElement = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    addressElement.addEventListener('input', function () {
        try {
            (new AddressBook()).address = addressElement.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    })

    const phoneElement = document.querySelector('#mobile');
    const phoneError = document.querySelector('.mobile-error');
    phoneElement.addEventListener('input', function () {
        try {
            (new AddressBook()).mobileNumber = phoneElement.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    })

    checkForUpdate();
});

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editContact');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name',addressBookObj._fullName);
    setValue('#mobile',addressBookObj._mobileNumber);
    setValue('#address',addressBookObj._address);
    setValue('#city',addressBookObj._city);
    setValue('#state',addressBookObj._state);
    setValue('#zip',addressBookObj._zip);
}

const saveForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
      try{
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        console.log(e);
        return;
    }
}

const setAddressBookObject = () => {
    addressBookObj._fullName=document.querySelector('#name').value,
    addressBookObj._mobileNumber=document.querySelector('#mobile').value,
    addressBookObj._address=document.querySelector('#address').value,
    addressBookObj._city=document.querySelector('#city').value,
    addressBookObj._state=document.querySelector('#state').value,
    addressBookObj._zip=document.querySelector('#zip').value
    }

const createAndUpdateStorage = (addressBookData) => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList){
        let addressBookData=addressBookList.find(contact=>contact._id == addressBookObj._id);
        if(!addressBookData){
            addressBookList.push(createAddressBookData());
        }else{
            const index= addressBookList.map(contact => contact._id).indexOf(addressBookData._id);
            addressBookList.splice(index,1,createAddressBookData(addressBookData._id));
        }
    }else{
        addressBookList=[createAddressBookData()]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBookData=(id)=>{
    let addressBookData=new AddressBook();
    if(!id) addressBookData.id=createNewAddressId();
    else addressBookData.id=id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const createNewAddressId=()=>{
 let addressID = localStorage.getItem("AddressID");
 addressID = !addressID ? 1 : (parseInt(addressID)+1).toString();
 localStorage.setItem("AddressID", addressID);
 return addressID;
}

const setAddressBookData=(addressBookData)=>{
     try {   
         addressBookData.fullName = addressBookObj._fullName;
     } catch(e) {
         setTextValue('.name-error', e);
         throw e;
     }
     try {   
         addressBookData.mobileNumber=addressBookObj._mobileNumber;
     } catch(e) {
         setTextValue('.mobile-error', e);
         throw e;
     }
     try {   
         addressBookData.address=addressBookObj._address;
     } catch(e) {
         setTextValue('.address-error', e);
         throw e;
     }
     addressBookData.city=addressBookObj._city;
     addressBookData.state=addressBookObj._state;
     addressBookData.zip=addressBookObj._zip;
     alert(addressBookData.toString());
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#mobile', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}

const setValue = (id, value) => {
    document.querySelector(id).value = value;
}


const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}