    document.addEventListener('DOMContentLoaded', function() {
        const quotes = [
            '" When I’m working on a hard work project I love to crunch Pepperidge Farm Cheddar cheese Goldfish. They have 100% real cheese and are that perfect snack for mindless crunching I need while coding something hard." -Crunchmister5',
            '" One thing I have always admired about this company and this particular Snack Line.... it continues to improve on the authentic and natural taste aspect of this particular snack. Baking temp. Time and the actual ingredients are so well calculated and executed.... I killed the bag in one sitting hahaha..." -PolarPioneer9',
            '"Same great taste that reminds me of childhood, goldfish has always been a staple snack in our house. Both my toddler and grade schooler love having them in their snack bag. Great crunch, bold flavor and no mess." -Kimnall7',
            '" Goldfish Cheddar Cheese Crackers are a staple in my home. My toddler loves these to snack on. They are small enough that I don’t have to worry when she eats them, they are a pretty good option for snacks on the market without any heavy dyes. And they aren’t just for my toddler because I love them too!" -Spencer8',
            '"This is a family favorite... my son use to eat these all the time then he just stopped. When I received the package I told him he had special mail and he got so excited he ate them right up." -Mommakim9'
        ];
        
 const quoteText = document.getElementById('Customer Reviews');
    const generateBtn = document.getElementById('generate-btn');

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    generateBtn.addEventListener("click", function() {
        quoteText.textContent = getRandomQuote();
    });
});

