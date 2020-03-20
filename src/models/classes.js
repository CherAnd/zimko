
export function User (id = '0', name = 'Guest', email = 'user@mail.ru') {
  this.id = id
  this.name = name
  this.email = email
}

export function Note (title = 'Title', body = '') {
  this.title = title
  this.body = body
}

// export class User {
//   constructor (id, name, email) {
//     this.id = id
//     this.name = name
//     this.email = email
//   }
//   static CreateGuest () {
//     return new User(0, 'Guest', 'user@mail.ru')
//   }

// export class Note {
//   constructor (id, date, title, body, created_at, updated_at, user_id) {
//     this.id = id
//     this.date = date
//     this.title = title
//     this.body = body
//     this.createdAt = created_at

//   }
// }

// body:"Empty bodyasdasd"
// created_at:"2019-11-30 20:14:27"
// date:null
// id:22
// title:"Titleasda"
// updated_at:"2019-11-30 20:14:27"
// user_id:2
