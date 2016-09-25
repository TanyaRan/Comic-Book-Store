import { dataServer } from './dataServer.js';
import { templateLoader as tl } from './template-loader.js';
import { books as b } from '../scripts/fakeDataBase.js';
var router = (() => {
    let navigo;

    function init() {
        navigo = new Navigo(null, false);

        navigo
            .on('home', () => {
                Promise.all([tl.loadTemplate('home')])
                    .then((template) => $('#container').html(template))
                    .catch(console.log);
            })
            .on('comic', () => {
                let everlive = new Everlive('co50xbssvfni5o0s');
                let comicBook = everlive.data('Comic');

                comicBook.get()
                    .then(function(data) {
                            let books = data;
                            Promise.all([books, tl.loadTemplate('miniBooksPreview')])
                                .then(([books, template]) => $('#container').html(template(books)))
                                .catch(console.log);
                        },
                        function(error) {
                            alert(JSON.stringify(error));
                        });


                // console.log(books.allBooks);
            })
            .on('about', () => {
                // Promise.all(['get the data', tl.loadTemplate('load the template by name')])
                //     .then(([data, template])=> $('#atach to DOM').html(template(data)))
                //     .catch(console.log);
            })
            .on('contact', () => {
                Promise.all([tl.loadTemplate('contactForm')])
                    .then((template) => $('#container').html(template))
                    .catch(console.log);
            })
            .on('register', () => {
                debugger;
                Promise.all([tl.loadTemplate('register')])
                    .then((template) => $('#container').html(template))
                    .catch(console.log);
            })
            .on('log-in', () => {
                // Promise.all(['get the data', tl.loadTemplate('load the template by name')])
                //     .then(([data, template])=> $('#atach to DOM').html(template(data)))
                //     .catch(console.log);
            })
            .on('log-out', () => {
                // Promise.all(['get the data', tl.loadTemplate('load the template by name')])
                //     .then(([data, template])=> $('#atach to DOM').html(template(data)))
                //     .catch(console.log);
            }).resolve();
    }
    return {
        init
    };

})();
export { router };