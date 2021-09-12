# Wilfred

It's just a name for this project where I used CRA, TypeScript and Redux to fetch some user profiles from https://randomuser.me/ and rendered them in a responsive grid with some simple pagination.

## The setup
I used Create React App to start a new project with the TypeScript template and then cleaned up some files I didn't need. Then I installed Material UI and copied one of their [starter templates](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album) to get going faster.

Before I got into Redux, I just wanted to get the layout done, so I initially just fetched a static number of profiles and rendered them while I tweaked the UI elements.

When I was satisfied with the layout I added Redux and picked one of the pagination components from Material UI. I implemented Redux by looking at different sources/tutorials, trying to do it right without overdoing it. I feel like it ended up OK for this project.

## The pagination
This is how I implemented a really simple pagination solution. On initial page load the web app will fetch a fixed amount of user profiles to populate one page. The pagination module will always allow the user to change to the next page. When the user changes to the next page, the web app will fetch only as many profiles needed to fill out the next page.

When the user goes back a page, the web app will render user profiles that are already in the store.

1. Initial page load = load 16 profiles from the API
2. Next page = load another 16 profiles from the API and add to the list of existing profiles
3. Previous page = slice out the previous 16 existing profiles from the store and render them

After finalizing this solution I figured out that the randomuser.me API actually supported pagination with static profiles (not random every time). I problably could have used that instead, to produce a more realistic pagination solution. But I've already done that solution multiple times before, and this solution was at least a bit fun to do.

## What's left?
I initially planned on adding my own API layer between the web app and randomuser.me, but I feel like it wouldn't have add any real value for this project.

Something that would add some value would've be tests, with which I don't really have that much experience (frontend wise). Given some time, this is something I know I could learn.
