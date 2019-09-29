import mongoose from 'mongoose';

export function connectMongoDb() {
  mongoose
    .connect('mongodb://localhost:27017/craiglist', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(con => {
      console.log('DB successfull connection!');
    })
    .catch(err => {
      console.log(err);
    });
}
