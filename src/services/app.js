import path from 'path';

const dboxDBService = [
    {
        id: '1',
        title: 'Word',
        tile: 'https://www.muycomputer.com/wp-content/uploads/2020/02/Microsoft-Word-560x600.jpg',
        background: '',
        icon: '',
        release_date: new Date(),
        rating: 0,
        create_date: new Date,
        tags: [],
        visiblity: true,
        path: path.normalize("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Word.lnk")
    },
    {
        id: '2',
        title: 'Power Point',
        tile: 'https://us.123rf.com/450wm/dennizn/dennizn1606/dennizn160600056/58006921-montreal-canad%C3%A1-23-de-mayo-2016-logotipo-de-microsoft-office-powerpoint-en-una-pantalla-de-tel%C3%A9fono-m%C3%B3vil-m.jpg?ver=6',
        background: '',
        icon: '',
        release_date: new Date(),
        rating: 0,
        create_date: new Date,
        tags: [],
        visiblity: true,
        path: path.normalize("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\PowerPoint.lnk")
    }
];

const appService = {};

appService.getById = (id) => {
    console.log('getById', id);
    return new Promise((resolve) => {
        const app = dboxDBService.filter((app) => app.id === id)[0];
        resolve(app);
    });
}

export default appService;
