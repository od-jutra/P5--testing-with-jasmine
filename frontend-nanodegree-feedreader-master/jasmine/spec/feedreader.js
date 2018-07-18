/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /*  the allFeeds variable has been defined and that it is not empty.  */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*  each of the allFeeds object have a URL defined
         * and that the URL is not empty. */
        it('has URL', function(){
            for (let feed of allFeeds){
                expect(feed.url.length).toBeGreaterThan(0);
                expect(feed.url).toBeDefined();                
            }
        })

        /*  each of the allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('has name', function(){
            for (let feed of allFeeds){
                expect(feed.name.length).toBeGreaterThan(0);
                expect(feed.name).toBeDefined();                
            }
        })
    });


    /*  a new test suite named "The menu" */
    describe('The menu', function(){
        /* menu element is hidden by default.*/
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
         /* the menu changes visibility when the menu icon is clicked. */
        it('appears and hide when menu icon is clicked', function(){
            $('.menu-icon-link').trigger('click')
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click')
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });
    /* new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /*  when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
        it('there is at least a single .entry element within the .feed container', function(){
            expect($('.feed .entry')).not.toBe(0);
        })
    });
    /*new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        let firstContent;
        let secondContent;
        /* new feed is loaded by the loadFeed and the  content changes. functions are nested to use loadFeed asynchronously*/
        beforeEach(function(done){
            loadFeed(0, function(){
                firstContent = document.body.innerHTML;
                loadFeed(1, function(){
                    secondContent = document.body.innerHTML;
                    console.log(secondContent);
                    done();
                })
            });
        }); 
        it('load a new content when a feed is chosen', function(done){
            for(let feed of allFeeds){
                $(feed).trigger('click')
                expect(firstContent).not.toBe(secondContent);
                done();
            }
        })
    });  
}());