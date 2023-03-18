let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    document.querySelector(".addressbook-count").textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? 
            JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = `
                        <th>Fullname</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Phone Number</th>
                        <th></th>
                        `;
    if(addressBookList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for ( const addressBookData of addressBookList) {
        innerHtml = `${innerHtml}
        <tr class="trr">
            <td>${addressBookData._fullName}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td>${addressBookData._mobileNumber}</td>
            <td>
                <img id="${addressBookData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${addressBookData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
    `;
    }
        document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove =(node)=>{
    let addressBookData=addressBookList.find(contact => contact._id == node.id);
    if(!addressBookData) return;
    const index=addressBookList.map(contact => contact._id).indexOf(addressBookData._id);
    addressBookList.splice(index,1);
    document.querySelector(".addressbook-count").textContent = addressBookList.length;
    localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
    createInnerHtml();
}