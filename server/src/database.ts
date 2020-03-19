import * as mongoose from 'mongoose';
export default class DataBase {
    public open(url: string) {
        return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('DataBase Connected.....');
            return true;
        }).catch(err => {
            console.log('Some error ocurred');
            return err;
        });
    }
    public disconnect() {
        mongoose.connection.close();
    }

}