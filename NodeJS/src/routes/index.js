
import userRoute from './user.js'
import studentRoute from './student.js'

const routes = (app) => {
    app.use('/user', userRoute)
    app.use('/student', studentRoute)

    app.use('/', (req, res) => {
        // res.send('hello world')
        // res.render('home', {layout: false});// khong su dung layout template (main.handlebar)
        res.render('home', 
        {
            showTitle: true,
            helpers: {
                mess() {return 'LAP TRINH THAT DE';},
                noti() {return 'ERROR';}
            }
        });//showTitle la bien ben trang Home, dung de an hien Title
    })
}

export default routes