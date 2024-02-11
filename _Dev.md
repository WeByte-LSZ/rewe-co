# Summary - How it works
- Goal is to make it possigle to generate interactive dashboard
- Should be possible via simple configuration files

## How it is actually done
- User provides a list of pages (hierarchy)
    - Each subpage has an id & definition via id
    - Page definition contains the components used in the applications
    - The components require certain data, components point to a data collection via an ID

- The page hierarchy is hardcoded in a `.ts` file, which is then loaded with the page
- The sidebar & search modal of the application are then updaded using the page hierarchy
    - Is a page now selected using the sidebar or search modal, then the page will be updaded using the layout information & data components
        - Needs to fetch page structure (which components are used and how they are aligned)
        - The components require data, so each component also needs to fetch the data

- Later on we can also implement a caching system to avoid fetches, but we can think about it later
