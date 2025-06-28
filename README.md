# Take-Home Assignment for Knot

This project was built with **React**, using **Vite**, **TypeScript**, and **Tailwind CSS** for rapid development and styling. It simulates a transaction dashboard and explores the kind of interactivity and structure you might see in a financial or order management interface.

### ✨ Features
- The **sidebar** opens/closes and includes fully functional **filters** for:
  - Order **status**
  - Type of **credit card** used
  - **Product name**  
- The **navigation buttons** are non-functional placeholders meant to show how the interface might scale into a multi-view layout.
- I added a **subtle, mouse-responsive gradient background** to introduce a light touch of interactivity and polish without distracting from the core experience.
- The layout and structure were designed with extensibility in mind—there’s room to add more filters or data groupings (e.g., filter by tax, eligibility, or order total).
- The UI is fully **responsive**, adapting to various screen sizes and devices.
- The interface is built with **accessibility** in mind, including proper semantic structure, keyboard focus states, and screen-reader support.

### 🧪 Data
The dummy order data is loosely based on Knot’s [TransactionLink object](https://docs.knotapi.com/api-reference/products/transaction-link/transaction-object) and was extended using AI-assisted generation to simulate a more realistic, varied dataset.

### 🧠 Areas for Future Work
- **Dark mode toggle** for improved usability in different lighting environments.
- **Advanced filtering** by:
  - Date range
  - Dollar amount
  - Currency
- **Custom stat card totals**, such as:
  - Total taxes collected
  - Average order value
  - Total units sold
  - Orders by card brand or status
- **Pagination or lazy loading** for large datasets
- **Export to CSV/JSON** for order reports
- **More Animations & transitions** for filter changes or sidebar toggles
- **Persistent filter state** (using localStorage or URL params)
- **User settings panel** to allow toggling specific totals or metrics

### 🚀 Running the Project
1. Clone or download this repo  
2. Run `npm install`  
3. Start the dev server: `npm run dev`  
4. Open the provided `localhost` URL in your browser