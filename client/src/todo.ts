// TODO:
// for every object in the array, get these information:
// const data = res.data._embedded.events -> events is an array that contains all the events
// data.map((obj) => {
// * id: obj.id,
//  attractions is optional if the event doesn't have an artist
// * artist?: obj._embedded.attractions[0].name,
// check if the artist have more than 1, otherwise, there are no guests.
// if there are more than 3 objects in the attractions array, get attractions.name but start at index 1 then join them
// * guests?: obj._embedded.attractions[1].name
// * eventName: obj.name,
// * date: obj.dates.start.localDate,
// * time: obj.dates.start.localTime,
// get three images, ratios are: 3_2, 16_9, 4_3. get their ratio and url. image: Image[]
// * images: obj.images -> array. obj.images[0].ratio -> only collect one of each
// venues is an array
// * country: obj._embedded.venues[0].country.name,
// * city: obj._embedded.venues[0].city.name,
// * venue: obj._embedded.venues[0].name,
// classification is an array. join the genre and subgenre together in this genre array
// * genre: obj.classifications[0].genre.name and obj.classifications[0].subGenre.name

// })


// TODO:
// if ratio is 4_3, 16_9 or 3_2, and is not included in the old array


// TODO: Pagination
// pagination:

// returns 20 elements per page

// 1. slice(0,5) to only get 5 elements per page
// 2. have a state that stores the elements you see
// 3. increment the state to 5. the state will be in the slice, responsible for being the last index

// See More Button
// 1. if seeMore button is clicked, add 5 to the eventsShown every time it's clicked
// 2. if eventsShown hits 20, increment the page number by 1 to switch page
// 	NOTE -> if eventsShown does not hit 20, it doesn't have a page two
// 3. eventsShown will be back to 5

