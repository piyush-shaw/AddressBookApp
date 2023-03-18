const update = (node) => {
    let addressBookData = addressBookList.find(contact => contact._id == node.id);
    if(!addressBookData) return;
    localStorage.setItem('editContact', JSON.stringify(addressBookData))
    window.location.replace(site_properties.add_address_book_page);
}