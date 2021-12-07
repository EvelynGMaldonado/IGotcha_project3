export const getSavedServicePostIds = () => {
const savedServicePostIds = localStorage.getItem('saved_servicePost')
    ? JSON.parse(localStorage.getItem('saved_servicePost'))
    : [];

return savedServicePostIds;
};

export const saveServicePostIds = (servicePostIdArr) => {
if (servicePostIdArr.length) {
    localStorage.setItem('saved_servicePost', JSON.stringify(servicePostIdArr));
} else {
    localStorage.removeItem('saved_servicePost');
}
};

export const removeServicePostId = (servicePostId) => {
const savedServicePostIds = localStorage.getItem('saved_servicePost')
    ? JSON.parse(localStorage.getItem('saved_servicePost'))
    : null;

if (!savedServicePostIds) {
    return false;
}

const updatedSavedServicePostIds = savedServicePostIds?.filter((savedServicePostId) => savedServicePostId !== servicePostId);
localStorage.setItem('saved_servicePost', JSON.stringify(updatedSavedServicePostIds));

return true;
};