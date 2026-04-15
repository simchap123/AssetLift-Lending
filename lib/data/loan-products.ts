export interface LoanProduct {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  keyStats: Array<{ label: string; value: string }>;
  features: Array<{ title: string; description: string }>;
  eligibility: Array<{ requirement: string; detail: string }>;
  process: Array<{ step: string; description: string }>;
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    slug: "fix-and-flip",
    title: "Fix & Flip Loans - Fast Funding for House Flipping Projects",
    description:
      "AssetLift Lending offers fix-and-flip loans with fast closings, competitive rates, and up to 90% LTV. Finance your next renovation project with a lender built for real estate investors.",
    heroTitle: "Fix & Flip Loans",
    heroSubtitle:
      "Close in days, not months. Get the capital you need to acquire and renovate investment properties with speed and certainty.",
    overview:
      "Fix-and-flip loans are short-term, asset-based financing instruments designed specifically for real estate investors who purchase distressed properties, renovate them, and sell them at a profit. Unlike conventional mortgages that evaluate your employment history and tax returns, fix-and-flip loans are underwritten primarily on the property's current value and its projected after-repair value (ARV). This means experienced flippers and first-time investors alike can access capital based on the strength of the deal rather than their personal financial profile.\n\nAssetLift Lending's fix-and-flip program provides acquisition financing up to 90% of the purchase price and 100% of the renovation budget, with total loan amounts capped at 70% to 75% of the after-repair value. Loan terms range from 6 to 18 months, giving borrowers ample time to complete renovations and list the property for sale without the pressure of an artificially short deadline. Renovation funds are held in escrow and disbursed through a structured draw process as work is completed, ensuring that capital is deployed efficiently and that the project stays on track.\n\nOur underwriting team evaluates every deal based on comparable sales data, the scope of the renovation plan, and the borrower's experience level. We fund single-family homes, duplexes, triplexes, four-unit properties, townhomes, and condos in markets across the country. Whether you are flipping your first house or your fiftieth, our streamlined process is designed to move at the speed your deals demand.\n\nThe fix-and-flip market remains one of the most profitable segments of real estate investing for those who execute disciplined renovation plans and buy at the right price. With property values continuing to reward well-positioned renovations and buyer demand staying strong in most metro areas, access to fast, reliable capital is the single biggest competitive advantage a flipper can have. AssetLift Lending exists to provide exactly that advantage.",
    keyStats: [
      { label: "Loan-to-Purchase Price", value: "Up to 90%" },
      { label: "Renovation Financing", value: "Up to 100% of rehab costs" },
      { label: "Loan Term", value: "6 to 18 months" },
      { label: "Closing Speed", value: "As fast as 7-14 business days" },
      { label: "Interest Rates Starting At", value: "9.5%" },
    ],
    features: [
      {
        title: "High-Leverage Acquisition Financing",
        description:
          "Borrow up to 90% of the purchase price on your next flip, reducing the out-of-pocket capital required to get into a deal. Combined with 100% rehab financing, you can control a property with as little as 10% of the purchase price in cash, freeing up liquidity for additional projects or reserves.",
      },
      {
        title: "Full Renovation Budget Coverage",
        description:
          "We finance up to 100% of the renovation budget through a structured draw process. Submit your scope of work at origination, and funds are released in stages as each phase of construction is completed and inspected. This eliminates the need to fund renovations out of pocket and keeps your capital working across multiple deals.",
      },
      {
        title: "Dedicated Draw Management",
        description:
          "Our in-house draw management team processes inspection requests within 48 hours. Once a draw is approved, funds are wired directly to your account or issued via check within 1 to 2 business days. We coordinate with your general contractor to ensure draw requests align with completed work and stay within the approved budget.",
      },
      {
        title: "No Prepayment Penalties",
        description:
          "Sell the property whenever you are ready without worrying about early payoff fees. Our fix-and-flip loans carry no prepayment penalties, so you keep every dollar of profit from a fast sale. If you finish ahead of schedule and close with a buyer in month 4 of a 12-month loan, you pay interest only for the time you used the capital.",
      },
      {
        title: "Experienced Borrower Rate Discounts",
        description:
          "Investors with a verified track record of completed flips qualify for reduced origination fees and lower interest rates. We reward experience because experienced borrowers reduce our risk. Bring documentation of your last 3 to 5 completed projects at application and our pricing team will build a customized rate sheet for your deal.",
      },
      {
        title: "Flexible Exit Strategies",
        description:
          "While most borrowers plan to sell the renovated property, our fix-and-flip loans also support refinance exits. If market conditions change or you decide to hold the property as a rental, you can refinance into a DSCR loan or conventional mortgage without penalty. This flexibility protects you from being forced into a sale at an unfavorable time.",
      },
    ],
    eligibility: [
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 620 or higher is required. Borrowers with scores above 700 qualify for the most competitive rate tiers. Scores between 620 and 660 are eligible with compensating factors such as higher down payments or demonstrated flipping experience.",
      },
      {
        requirement: "Down Payment",
        detail:
          "A minimum of 10% of the purchase price is required at closing, funded from your own capital or a documented capital partner. Gift funds and unsecured borrowed funds are not eligible for the down payment. Larger down payments (15% to 20%) unlock better interest rates and origination pricing.",
      },
      {
        requirement: "Property Types",
        detail:
          "Eligible properties include single-family residences, duplexes, triplexes, four-unit buildings, townhomes, and warrantable condos. The property must be non-owner-occupied and intended for renovation and resale or refinance. Raw land and ground-up construction are not eligible under this program.",
      },
      {
        requirement: "Renovation Scope of Work",
        detail:
          "A detailed scope of work with line-item costs must be submitted at application. The renovation plan should be prepared by or reviewed with a licensed general contractor. We accept renovations ranging from cosmetic updates to full gut rehabilitations, provided the total project stays within our maximum ARV guidelines.",
      },
      {
        requirement: "Real Estate Experience",
        detail:
          "First-time flippers are welcome, though borrowers with no prior flipping experience may face slightly higher rates or lower maximum leverage. Having a licensed general contractor on your team or documented construction management experience strengthens your application. Repeat borrowers with 3 or more completed flips receive preferential pricing.",
      },
    ],
    process: [
      {
        step: "Apply and Submit Your Deal",
        description:
          "Complete our online application in under 15 minutes. Upload the purchase contract, your renovation scope of work with cost estimates, comparable sales supporting your ARV estimate, and a brief summary of your investment experience. Our team reviews every submission within 24 hours and issues a preliminary term sheet if the deal meets our guidelines.",
      },
      {
        step: "Underwriting and Appraisal",
        description:
          "Once you accept the term sheet, we order a third-party appraisal or broker price opinion to confirm the property's as-is value and after-repair value. Our underwriting team reviews the title report, property insurance, and your borrower profile in parallel. Most files clear underwriting within 3 to 5 business days of receiving all required documents.",
      },
      {
        step: "Closing and Funding",
        description:
          "We coordinate with the title company or closing attorney to prepare loan documents, schedule signing, and wire funds. Acquisition proceeds are funded directly to the closing agent at the time of purchase. Renovation funds are deposited into a controlled escrow account managed by AssetLift Lending and disbursed as work is completed.",
      },
      {
        step: "Renovation Draws and Project Completion",
        description:
          "As you complete each phase of renovation, submit a draw request through our online portal. We dispatch an inspector to verify completed work within 48 hours and release the corresponding funds within 1 to 2 business days after approval. When the renovation is complete, you list the property for sale or initiate a refinance to pay off the loan.",
      },
    ],
    useCases: [
      {
        title: "Residential Property Flips",
        description:
          "The classic fix-and-flip: purchase a dated or distressed single-family home, complete a cosmetic or moderate renovation, and sell to a retail buyer at a profit. Our financing covers the acquisition and the full rehab budget, allowing you to enter deals with minimal out-of-pocket capital and maximum speed.",
      },
      {
        title: "Auction and Foreclosure Purchases",
        description:
          "Auction purchases require proof of funds and rapid closing. AssetLift Lending provides proof-of-funds letters for active borrowers and can close within 5 to 7 business days, making it possible to compete at courthouse auctions, HUD sales, and bank-owned property liquidations where traditional financing is not an option.",
      },
      {
        title: "Small Multifamily Value-Add",
        description:
          "Purchase a 2-4 unit property with below-market rents, renovate the units to justify higher rental rates, and either sell at the improved valuation or refinance into a long-term DSCR loan. Our fix-and-flip program finances the acquisition and renovation, and our DSCR program handles the take-out refinance.",
      },
      {
        title: "Wholesale Double-Close Financing",
        description:
          "Wholesalers who need transactional funding to close on a property before immediately reselling to an end buyer can use our short-term bridge product. Funds are available for same-day or next-day closings, and the loan is repaid from the proceeds of the B-to-C sale, often within hours of the original purchase.",
      },
    ],
    faqs: [
      {
        question: "How quickly can AssetLift Lending close a fix-and-flip loan?",
        answer:
          "Many straightforward files can close in as fast as 7 to 14 business days from the date a complete application is received. Timing depends on how quickly valuations are completed, how fast you provide requested documents, and the title company's scheduling availability.",
      },
      {
        question: "Do you finance the full renovation cost?",
        answer:
          "Yes, we finance up to 100% of the renovation budget as outlined in your approved scope of work. Renovation funds are held in escrow and released in draws as work is completed and inspected. This means you do not need to fund renovations out of pocket, though the total loan amount (purchase plus rehab) is capped at 70% to 75% of the property's after-repair value.",
      },
      {
        question: "What happens if my renovation goes over budget?",
        answer:
          "If your project exceeds the original scope of work, you can request a budget increase by submitting a change order with updated cost estimates. Our team will review the request and, if the revised total still falls within our maximum ARV guidelines, approve the additional funds. Budget overruns that push the total loan above our ARV cap will need to be funded by the borrower from their own resources.",
      },
      {
        question: "Can I use a fix-and-flip loan for a property I plan to keep as a rental?",
        answer:
          "Yes. While the loan is structured for a short-term hold, your exit strategy can be a sale or a refinance. If you decide to keep the property, you will need to refinance into a long-term loan (such as a DSCR or conventional mortgage) before the fix-and-flip loan matures. There is no penalty for choosing a refinance exit instead of a sale exit.",
      },
      {
        question: "Do I need a general contractor, or can I do the work myself?",
        answer:
          "We do not require a licensed general contractor for every project, but having one significantly strengthens your application, particularly for large-scope renovations. If you plan to self-manage the rehab using subcontractors, you should demonstrate prior renovation experience and provide a detailed, itemized scope of work. For gut renovations or structural work, we strongly recommend and may require a licensed GC.",
      },
      {
        question: "Are there any geographic restrictions?",
        answer:
          "AssetLift Lending funds fix-and-flip projects in most U.S. states. We focus on metropolitan statistical areas and suburban markets with strong comparable sales activity. Rural properties with limited comp data may require additional underwriting review. Contact our team with the property address before applying, and we will confirm eligibility within 24 hours.",
      },
    ],
  },
  {
    slug: "ground-up-construction",
    title: "Ground-Up Construction Loans - Finance New Builds from the Ground Up",
    description:
      "AssetLift Lending provides ground-up construction loans for residential builders and investors. Fund land acquisition, vertical construction, and project completion with a single loan from a dedicated construction lender.",
    heroTitle: "Ground-Up Construction Loans",
    heroSubtitle:
      "Build from scratch with confidence. Our construction loans cover land, permits, and vertical build costs so you can focus on delivering a finished product.",
    overview:
      "Ground-up construction loans are specialized financing products that fund the entire lifecycle of a new residential build, from land acquisition through vertical construction to project completion. Unlike fix-and-flip loans that finance the purchase and renovation of existing structures, construction loans are designed for vacant lots, teardowns, and entitled land parcels where the borrower intends to build a new residential property from the foundation up.\n\nAssetLift Lending's construction program finances up to 85% of the total project cost, including land purchase, permits, site preparation, and all hard and soft construction costs. Funds are disbursed through a carefully managed draw schedule tied to construction milestones, ensuring that capital is released only as work progresses. This protects both the borrower and the lender by maintaining alignment between the money deployed and the value created at each stage of the build.\n\nOur construction underwriting team evaluates every project based on the completed value of the finished home, the borrower's construction experience, the qualifications of the general contractor, and the strength of comparable sales in the target market. We finance single-family spec homes, custom builds, townhome developments, and small multifamily projects of up to four units. Projects must be located in markets with demonstrable demand for new construction and sufficient comparable sales data to support the projected completed value.\n\nGround-up construction is the most capital-intensive and complex segment of residential real estate investing, but it also offers the highest potential returns. Building a new home allows the investor to create value from raw materials rather than being limited by the existing structure and layout of a renovation property. For experienced builders and investors ready to take on the challenge, AssetLift Lending provides the capital, structure, and support to bring projects from blueprint to certificate of occupancy.",
    keyStats: [
      { label: "Loan-to-Cost (LTC)", value: "Up to 85%" },
      { label: "Loan-to-Completed Value", value: "Up to 70%" },
      { label: "Loan Term", value: "12 to 24 months" },
      { label: "Minimum Loan Amount", value: "$150,000" },
      { label: "Interest Rates Starting At", value: "10.5%" },
    ],
    features: [
      {
        title: "Land and Construction in a Single Loan",
        description:
          "Finance the land acquisition and the entire construction budget under one loan, eliminating the need to secure separate land financing and a construction line. This simplifies your capital stack, reduces closing costs, and provides certainty of funding from day one through project completion.",
      },
      {
        title: "Milestone-Based Draw Schedule",
        description:
          "Construction funds are released according to a pre-agreed draw schedule aligned with key construction milestones: foundation, framing, rough mechanicals, drywall, and final finishes. Each draw is verified by a third-party inspector before funds are released, ensuring accountability and protecting the project budget.",
      },
      {
        title: "Interest-Only Payments on Drawn Funds",
        description:
          "You pay interest only on the portion of the loan that has been disbursed, not the full loan amount. In the early stages of construction when only a fraction of the budget has been drawn, your monthly payments are proportionally lower. This preserves your cash flow during the capital-intensive build phase.",
      },
      {
        title: "Experienced Construction Underwriting",
        description:
          "Our underwriting team includes professionals with direct experience in residential construction lending. We understand construction timelines, builder risk factors, and market absorption rates. This expertise allows us to structure loans that align with realistic project schedules rather than applying generic timelines that do not reflect the realities of new construction.",
      },
      {
        title: "Flexible Exit Options",
        description:
          "Sell the completed home to a retail buyer, refinance into a long-term rental loan if you decide to hold, or roll the finished property into a portfolio refinance. Our construction loans carry no prepayment penalties, giving you full flexibility to choose the most profitable exit based on market conditions at the time of completion.",
      },
    ],
    eligibility: [
      {
        requirement: "Construction Experience",
        detail:
          "Borrowers must demonstrate prior experience managing residential construction projects, either as a licensed builder, developer, or investor who has completed at least 2 ground-up builds. First-time builders are considered on a case-by-case basis if partnered with an experienced, licensed general contractor with a verifiable track record.",
      },
      {
        requirement: "Licensed General Contractor",
        detail:
          "All projects must be managed by a licensed general contractor with current insurance coverage (general liability and workers compensation) and a portfolio of completed residential builds. The GC's qualifications are underwritten alongside the borrower's profile, and their experience level directly impacts loan approval and pricing.",
      },
      {
        requirement: "Approved Plans and Permits",
        detail:
          "Architectural plans, engineering drawings, and all required building permits must be obtained or in active review before the loan closes. Projects that have not yet begun the permitting process may be approved with a delayed closing contingency that holds the rate and terms while permits are finalized.",
      },
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 660 or higher is required for the primary borrower or guarantor. Credit scores above 700 qualify for preferred pricing. The credit review also includes an examination of the borrower's construction-related liabilities, outstanding liens, and any history of contractor disputes or project defaults.",
      },
      {
        requirement: "Down Payment and Reserves",
        detail:
          "A minimum equity contribution of 15% of the total project cost is required. This can be in the form of cash, land equity (if the lot is already owned), or a combination. Borrowers must also demonstrate liquid reserves sufficient to cover 3 to 6 months of interest payments as a cushion against construction delays.",
      },
    ],
    process: [
      {
        step: "Project Submission and Feasibility Review",
        description:
          "Submit your project package including architectural plans, a detailed construction budget, the general contractor's credentials, and comparable sales for the target market. Our team conducts a feasibility review within 48 hours, evaluating the project's completed value, market demand, and overall risk profile before issuing a term sheet.",
      },
      {
        step: "Underwriting and Due Diligence",
        description:
          "Upon term sheet acceptance, we commission a full appraisal based on the proposed plans and specifications, review the title report and zoning compliance, verify the general contractor's license and insurance, and complete a background and credit review of the borrower. This phase typically takes 10 to 14 business days.",
      },
      {
        step: "Closing and Initial Funding",
        description:
          "At closing, the land acquisition cost (if applicable) and initial soft costs (permits, architectural fees, site preparation) are funded. The remaining construction budget is held in a controlled escrow account and released through the draw process. You begin construction immediately after closing with full certainty that the remaining funds are committed.",
      },
      {
        step: "Construction Draws and Project Completion",
        description:
          "As each construction milestone is reached, submit a draw request with supporting documentation (invoices, photos, lien waivers from subcontractors). A third-party inspector verifies the completed work, and funds are released within 3 to 5 business days. Upon project completion, you obtain a certificate of occupancy and execute your exit strategy: sale, refinance, or lease.",
      },
    ],
    useCases: [
      {
        title: "Spec Home Construction",
        description:
          "Build a new single-family home on a vacant lot for resale to a retail buyer. Spec homes in high-demand submarkets with limited new inventory can command premium pricing and sell quickly, generating returns that exceed typical renovation projects because every element of the home is new and under warranty.",
      },
      {
        title: "Teardown and Rebuild",
        description:
          "Purchase a functionally obsolete home on a valuable lot, demolish the existing structure, and build a modern home that aligns with current buyer preferences and neighborhood comps. Teardown-rebuild projects are common in established neighborhoods where land values are high but existing housing stock is outdated.",
      },
      {
        title: "Infill Development",
        description:
          "Develop underutilized lots within established neighborhoods, building new homes that fill gaps in local housing supply. Infill projects often face less competition than greenfield development and benefit from established infrastructure, school zones, and neighborhood amenities that support premium pricing.",
      },
      {
        title: "Small Multifamily New Construction",
        description:
          "Build duplexes, triplexes, or fourplexes in markets with strong rental demand. New construction multifamily properties command top-of-market rents, require minimal near-term maintenance, and appraise favorably for refinancing into long-term DSCR loans after completion and lease-up.",
      },
    ],
    faqs: [
      {
        question: "Can I finance the land purchase and construction in one loan?",
        answer:
          "Yes. Our ground-up construction loan covers both the land acquisition and the full construction budget under a single loan. If you already own the land, its current appraised value can count toward your equity contribution, potentially reducing the cash you need to bring to closing.",
      },
      {
        question: "How does the draw process work during construction?",
        answer:
          "We establish a draw schedule at closing based on your construction timeline and budget. As you complete each milestone (foundation, framing, rough mechanicals, etc.), you submit a draw request through our online portal. A third-party inspector visits the site to verify the work, and upon approval, funds are wired to your account within 3 to 5 business days. Most projects involve 4 to 6 draws over the construction period.",
      },
      {
        question: "What if construction takes longer than expected?",
        answer:
          "Our loan terms include built-in flexibility for reasonable construction delays. If you need additional time beyond the original term, we offer loan extensions on a case-by-case basis, typically for a modest extension fee. To minimize the risk of delays, we encourage borrowers to build a 10% to 15% contingency into their construction budgets and to work with experienced, well-capitalized general contractors.",
      },
      {
        question: "Do you finance ADUs or detached guest houses?",
        answer:
          "Accessory dwelling units (ADUs) and detached structures can be financed as part of a larger construction project that includes a primary residence or as standalone builds in jurisdictions where ADU construction is permitted by right. The completed value must be supported by comparable sales or rental income data. Contact our team to discuss the specifics of your ADU project.",
      },
      {
        question: "What types of properties can I build?",
        answer:
          "Our construction loan program covers single-family homes, duplexes, triplexes, four-unit properties, and townhomes. We finance both stick-built and modular construction. We do not currently finance commercial properties, mixed-use buildings with more than 25% commercial space, or large-scale subdivisions of more than 4 units, though we can refer you to lending partners who specialize in those asset classes.",
      },
      {
        question: "Is builder experience absolutely required?",
        answer:
          "We strongly prefer borrowers with at least 2 completed ground-up construction projects. However, first-time builders who partner with an experienced, licensed general contractor with a strong track record may be considered. In these cases, we may require a higher equity contribution or lower maximum loan-to-cost to offset the inexperience of the borrower.",
      },
    ],
  },
  {
    slug: "dscr-rental",
    title: "DSCR Rental Loans - No Income Verification Financing for Investment Properties",
    description:
      "Qualify for a rental property loan based on property cash flow, not personal income. AssetLift Lending's DSCR loans offer 30-year terms, LLC vesting, and no tax return requirements for real estate investors.",
    heroTitle: "DSCR Rental Loans",
    heroSubtitle:
      "Qualify on rental income, not tax returns. Scale your rental portfolio with 30-year financing designed exclusively for real estate investors.",
    overview:
      "DSCR (Debt Service Coverage Ratio) rental loans represent the most significant innovation in investment property financing in the last decade. They solve a problem that has frustrated rental property investors for years: the disconnect between the income a portfolio generates and the income shown on personal tax returns. Real estate investors, especially those who are self-employed or who aggressively depreciate their properties, often report low taxable income despite holding portfolios worth millions of dollars. Conventional lenders see low reported income and decline the application. DSCR lenders see a cash-flowing property and fund the deal.\n\nThe concept is straightforward. Instead of verifying the borrower's personal income through tax returns and pay stubs, a DSCR lender divides the property's gross rental income by the total monthly debt obligation (principal, interest, taxes, insurance, and HOA). If the resulting ratio meets or exceeds the lender's minimum threshold, typically 1.0 to 1.25, the loan is approved. No W-2s. No 1099s. No tax returns. No debt-to-income ratio calculations. The property qualifies itself.\n\nAssetLift Lending's DSCR rental loan program offers 30-year fixed and adjustable rate options, loan amounts from $75,000 to $2 million, and the ability to close in the name of an LLC or other business entity. We finance single-family homes, 2-4 unit properties, condos, and townhomes, and there is no limit on the number of properties you can finance with us. Whether you are refinancing a property you just finished rehabbing or purchasing a turnkey rental, our DSCR product is designed to keep your portfolio growing without the documentation headaches of conventional lending.\n\nFor investors who have outgrown the conventional lending box, hit the Fannie Mae property count ceiling, or simply prefer the speed and simplicity of asset-based qualification, DSCR loans from AssetLift Lending provide the most scalable path to building a rental portfolio that generates lasting, tax-advantaged wealth.",
    keyStats: [
      { label: "Loan-to-Value (Purchase)", value: "Up to 80%" },
      { label: "Loan-to-Value (Cash-Out Refi)", value: "Up to 75%" },
      { label: "Minimum DSCR Ratio", value: "1.0 (lower available with adjustments)" },
      { label: "Loan Term", value: "30-year fixed or 5/6 ARM" },
      { label: "Interest Rates Starting At", value: "5.75%" },
    ],
    features: [
      {
        title: "No Personal Income Verification",
        description:
          "We do not require tax returns, W-2s, 1099s, or profit-and-loss statements. Your qualification is based entirely on the subject property's rental income and your credit profile. This is the defining advantage of DSCR lending and the reason it has become the preferred financing tool for full-time real estate investors.",
      },
      {
        title: "Close in Your LLC or Entity Name",
        description:
          "Title the property in your LLC, LP, or corporation from day one. Unlike conventional mortgages that require individual vesting, DSCR loans are originated directly in the name of your business entity. This preserves the liability protection you set up your LLC to provide, without the risk of triggering a due-on-sale clause by transferring title after closing.",
      },
      {
        title: "No Property Count Limits",
        description:
          "Finance your 5th, 15th, or 50th rental property with the same streamlined process. There is no Fannie Mae-style cap on the number of financed properties. Each property is underwritten independently based on its own cash flow, so scaling your portfolio does not create compounding documentation burdens.",
      },
      {
        title: "30-Year Fixed Rate Option",
        description:
          "Lock in a fixed interest rate for the full 30-year term of the loan, providing payment certainty and protection against rising interest rates. Fixed-rate DSCR loans allow you to model long-term cash flow with confidence, knowing your debt service will never increase regardless of market conditions.",
      },
      {
        title: "Cash-Out Refinancing Available",
        description:
          "Access the equity in your existing rental properties through cash-out refinances at up to 75% LTV. Use the proceeds to fund new acquisitions, complete renovations on other properties, or pay down higher-cost debt. Cash-out DSCR refinances are one of the most powerful tools for recycling capital within a rental portfolio.",
      },
      {
        title: "Interest-Only Payment Option",
        description:
          "Choose an interest-only payment structure for the first 5 to 10 years of the loan to maximize monthly cash flow during the early ownership period. Interest-only payments reduce your monthly obligation, increasing the net income the property generates and improving your return on equity during the years when rental income growth is compounding.",
      },
    ],
    eligibility: [
      {
        requirement: "Minimum DSCR Ratio",
        detail:
          "The property's gross monthly rent divided by the total monthly housing expense (PITIA) must equal or exceed 1.0 for standard pricing. Ratios of 1.25 or higher qualify for the best available rates. Programs for ratios between 0.75 and 0.99 are available with compensating factors such as lower LTV, higher credit score, or additional reserves.",
      },
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 660 is the minimum for program eligibility. Scores of 720 and above qualify for the most competitive rates and highest leverage. Borrowers with scores between 660 and 700 are eligible with modest rate adjustments. The credit review also evaluates for recent bankruptcies, foreclosures, or short sales, which may require additional seasoning.",
      },
      {
        requirement: "Property Condition",
        detail:
          "The property must be in rentable condition at the time of closing. This means it must be habitable, free of major structural defects, and ready to generate rental income immediately. Properties requiring significant renovation should be financed with a fix-and-flip loan first, then refinanced into a DSCR loan after rehab is complete and the property is stabilized.",
      },
      {
        requirement: "Reserves",
        detail:
          "Borrowers must hold liquid reserves equal to 3 to 6 months of the total monthly housing payment at the time of closing. Acceptable reserves include bank account balances, brokerage accounts, retirement accounts (valued at 60% to 70%), and documented cryptocurrency holdings. Reserves protect against vacancy and maintenance costs during the early months of ownership.",
      },
      {
        requirement: "Eligible Property Types",
        detail:
          "Single-family homes, duplexes, triplexes, four-unit properties, warrantable condos, and townhomes qualify under our DSCR program. Properties must be non-owner-occupied. Short-term rental properties (Airbnb, VRBO) may be eligible using projected rental income from a third-party rental analysis or 12 months of documented booking history.",
      },
    ],
    process: [
      {
        step: "Application and Property Analysis",
        description:
          "Submit your application online along with the property address, current or projected rent, and your credit authorization. Our team pulls comps, verifies rental income against market data, and calculates the DSCR ratio. You receive a rate quote and term sheet within 24 to 48 hours of application.",
      },
      {
        step: "Appraisal and Underwriting",
        description:
          "We order a full appraisal that includes a rental survey to establish the property's fair market rent. The underwriting review covers the property's condition, the borrower's credit profile, and the entity documentation (if closing in an LLC). Because no income verification is required, the underwriting timeline is significantly shorter than conventional loans, typically 5 to 10 business days.",
      },
      {
        step: "Conditional Approval and Document Collection",
        description:
          "Once underwriting is complete, you receive a conditional approval with a list of remaining items needed for clear-to-close. Common conditions include proof of insurance, entity formation documents, reserve verification, and a signed lease agreement (for purchase transactions on tenanted properties). Most conditions are satisfied within 2 to 3 business days.",
      },
      {
        step: "Closing",
        description:
          "We coordinate with the title company or closing attorney to prepare and execute loan documents. Funds are wired at closing for purchases, or disbursed within 3 business days for refinances after the rescission period (where applicable). The entire process from application to funded loan typically takes 14 to 21 business days.",
      },
    ],
    useCases: [
      {
        title: "BRRRR Strategy Refinance",
        description:
          "After completing a renovation and placing a tenant, refinance out of your short-term hard money or fix-and-flip loan into a 30-year DSCR loan. Recover your renovation capital through a cash-out refinance and redeploy it into the next acquisition. Our DSCR product is purpose-built as the long-term take-out loan in the BRRRR cycle.",
      },
      {
        title: "Turnkey Rental Acquisition",
        description:
          "Purchase a stabilized rental property that already has a tenant in place and is generating income. The existing lease provides the rental income documentation needed for DSCR qualification, and the property's cash flow history gives confidence in the underwriting. Close in your LLC name with no income documentation required.",
      },
      {
        title: "Portfolio Consolidation",
        description:
          "If you have multiple rental properties financed with short-term or variable-rate loans, consolidate them into individual 30-year DSCR loans at fixed rates. This stabilizes your monthly cash flow, extends your repayment timeline, and eliminates the refinance risk associated with balloon-payment or adjustable-rate products.",
      },
      {
        title: "Short-Term Rental Financing",
        description:
          "Finance vacation rentals and short-term rental properties using projected income from platforms like Airbnb and VRBO. We accept third-party rental projections from services like AirDNA or 12 months of documented booking revenue to establish the DSCR ratio. This opens DSCR financing to the growing short-term rental investor market.",
      },
    ],
    faqs: [
      {
        question: "What does DSCR stand for, and how is it calculated?",
        answer:
          "DSCR stands for Debt Service Coverage Ratio. It is calculated by dividing the property's gross monthly rental income by the total monthly housing payment, which includes principal, interest, property taxes, homeowner's insurance, and any HOA dues (commonly abbreviated as PITIA). A DSCR of 1.25 means the property generates 25% more income than the total monthly payment, indicating strong cash flow. A DSCR of 1.0 means income exactly covers the payment.",
      },
      {
        question: "Do I really not need to provide tax returns?",
        answer:
          "Correct. DSCR loans do not require personal or business tax returns, W-2s, 1099s, or profit-and-loss statements. Your qualification is based on the property's rental income and your credit score. This is the core advantage of DSCR lending: the property's cash flow, not your personal income, determines eligibility. You will still need to provide standard items like an ID, entity documents, proof of insurance, and reserve verification.",
      },
      {
        question: "Can I finance a short-term rental (Airbnb) with a DSCR loan?",
        answer:
          "Yes. We offer DSCR loans for short-term rental properties using projected income from third-party analytics platforms (such as AirDNA) or 12 months of documented booking revenue from Airbnb, VRBO, or similar platforms. The projected or historical income is used in place of a traditional lease to calculate the DSCR ratio. Some rate or LTV adjustments may apply compared to long-term rental properties.",
      },
      {
        question: "What is the minimum down payment for a DSCR purchase loan?",
        answer:
          "The minimum down payment is 20% of the purchase price for properties with a DSCR of 1.25 or higher. For properties with lower DSCR ratios (between 1.0 and 1.24), a 25% down payment may be required. Properties with DSCR ratios below 1.0 typically require 25% to 30% down. A larger down payment also qualifies you for a lower interest rate, so putting down 25% to 30% can meaningfully improve your borrowing terms.",
      },
      {
        question: "Is there a maximum number of DSCR loans I can have?",
        answer:
          "No. Unlike conventional mortgages, which are subject to the Fannie Mae 10-property limit, our DSCR program has no cap on the number of loans per borrower. You can finance 5, 25, or 100 properties with AssetLift Lending, and each is underwritten independently based on its own cash flow. This makes DSCR lending the only realistic option for investors building large rental portfolios.",
      },
      {
        question: "Can I use a DSCR loan for a property that needs minor repairs?",
        answer:
          "DSCR loans are designed for properties that are in rent-ready condition. Minor cosmetic issues (paint, landscaping, appliance replacements) are generally acceptable as long as the property is habitable and can generate rental income immediately after closing. Properties that require significant structural, mechanical, or safety repairs should be financed with a fix-and-flip or rehab loan first, then refinanced into a DSCR loan after the work is complete.",
      },
    ],
  },
  {
    slug: "bridge",
    title: "Bridge Loans for Real Estate Investors - Short-Term Capital When You Need It Most",
    description:
      "AssetLift Lending offers bridge loans for real estate investors who need fast, flexible capital to close acquisitions, reposition assets, or bridge the gap between transactions. Close in as few as 3 days.",
    heroTitle: "Bridge Loans",
    heroSubtitle:
      "Bridge the gap between opportunity and long-term financing. Close fast, act decisively, and execute your strategy without waiting on slow capital.",
    overview:
      "Bridge loans are short-term financing instruments that provide immediate capital to real estate investors who need to move quickly, cannot wait for conventional underwriting timelines, or face situations where traditional lending products do not apply. The term \"bridge\" refers to the loan's purpose: it bridges the gap between an immediate capital need and a longer-term financing solution or asset disposition. Bridge loans are not a permanent financing tool. They are a tactical weapon deployed when speed, certainty, and flexibility matter more than cost.\n\nThe scenarios that call for bridge loans are varied and time-sensitive. An investor may need to close on a property in 5 days to beat a competing offer. A borrower's conventional loan may fall through 48 hours before closing, and they need replacement capital to avoid losing their earnest money. A property owner may need to pull equity from an existing asset to fund a down payment on a new acquisition before the first property sells. In each case, a bridge loan solves a problem that no other financing product can address within the required timeframe.\n\nAssetLift Lending's bridge loan program is built for exactly these situations. We offer loan terms from 3 to 24 months, with closings as fast as 3 business days for borrowers with pre-approved profiles and clear title. Our bridge loans finance acquisitions, refinances, cash-out equity extraction, and partner buyouts on residential and small commercial properties. Loan amounts range from $100,000 to $3 million, with leverage up to 75% of the as-is property value.\n\nThe cost of a bridge loan is higher than a conventional mortgage, but the value it provides is measured in deals saved, opportunities captured, and financial flexibility preserved. For investors operating in competitive markets where the best deals go under contract within hours, having access to fast, reliable bridge capital is not a luxury. It is a requirement for staying in the game.",
    keyStats: [
      { label: "Loan-to-Value (As-Is)", value: "Up to 75%" },
      { label: "Loan Term", value: "3 to 24 months" },
      { label: "Closing Speed", value: "As fast as 3 business days" },
      { label: "Loan Amount Range", value: "$100,000 to $3,000,000" },
      { label: "Interest Rates Starting At", value: "10%" },
    ],
    features: [
      {
        title: "Rapid Closing Capability",
        description:
          "We close bridge loans in as few as 3 business days for borrowers with clean title, pre-approved borrower profiles, and complete documentation. Standard bridge closings take 5 to 10 business days. This speed allows you to make competitive offers with short due diligence periods and close before other buyers can even secure financing.",
      },
      {
        title: "Flexible Collateral Types",
        description:
          "Bridge loans from AssetLift Lending can be secured by single-family homes, multifamily properties (2-8 units), mixed-use buildings, and small commercial properties. We also consider cross-collateralization, where equity in a property you already own provides additional security for the bridge loan on a new acquisition.",
      },
      {
        title: "Interest-Only Payments",
        description:
          "All bridge loans feature interest-only monthly payments, minimizing your carrying costs during the hold period. You are not paying down principal on a loan designed to be repaid in full within months. This structure preserves your cash flow and keeps more capital available for renovation, operating expenses, or reserves.",
      },
      {
        title: "Multiple Exit Strategy Support",
        description:
          "Whether your exit plan is a property sale, a refinance into a DSCR or conventional loan, or a cash infusion from another source, our bridge loans are structured to accommodate any legitimate repayment path. We work with you at origination to identify and document your planned exit, and we provide guidance on timing your transition to permanent financing.",
      },
      {
        title: "No Prepayment Penalty",
        description:
          "Repay the bridge loan at any time without penalty. If your property sells in month 2 of a 12-month loan, you pay interest only for the two months you held the capital. This no-penalty structure ensures that fast exits are rewarded rather than penalized, aligning the lender's incentives with the borrower's goal of a quick, profitable resolution.",
      },
    ],
    eligibility: [
      {
        requirement: "Property Value and Equity",
        detail:
          "The subject property must appraise for a value that supports the requested loan amount at or below 75% loan-to-value. For cross-collateralized loans, the combined LTV across all pledged properties must not exceed 65%. A current appraisal or broker price opinion will be ordered as part of the underwriting process.",
      },
      {
        requirement: "Defined Exit Strategy",
        detail:
          "Every bridge loan requires a clearly articulated exit strategy documented at origination. Acceptable exits include property sale (with comparable sales data supporting the anticipated sale price), refinance (with preliminary qualification from the take-out lender), or payoff from proceeds of another closing. Bridge loans without a credible exit plan will not be approved.",
      },
      {
        requirement: "Minimum Credit Score",
        detail:
          "A FICO score of 620 or higher is required. Bridge loan underwriting places less emphasis on credit score than conventional lending, but a score below 650 may result in reduced leverage or higher pricing. Recent bankruptcies (within 2 years) or active foreclosures may disqualify the borrower regardless of the current score.",
      },
      {
        requirement: "Liquidity and Reserves",
        detail:
          "Borrowers must demonstrate liquid assets sufficient to cover 6 to 12 months of interest payments at closing. Bridge loans are short-term instruments with inherent timing risk, and adequate reserves ensure that the borrower can service the loan even if the exit takes longer than projected. Acceptable reserve sources include bank accounts, investment accounts, and documented lines of credit.",
      },
      {
        requirement: "Real Estate Investment Experience",
        detail:
          "While bridge loans are available to investors at all experience levels, borrowers with a demonstrated track record of successful real estate transactions will receive better pricing and higher leverage. First-time investors applying for bridge loans should present a detailed business plan, a strong exit strategy, and ideally a mentor or partner with relevant experience.",
      },
    ],
    process: [
      {
        step: "Initial Inquiry and Scenario Review",
        description:
          "Contact our bridge loan team with the details of your situation: the property address, your capital need, the timeline, and your planned exit strategy. We provide a preliminary indication of terms within hours, not days. For time-critical deals, we can issue a term sheet the same day you contact us, allowing you to present a financed offer to the seller immediately.",
      },
      {
        step: "Term Sheet and Commitment",
        description:
          "Once you accept the preliminary terms, we issue a formal commitment letter outlining the loan amount, interest rate, term, fees, and conditions. The commitment holds your terms for 30 days while underwriting and closing are completed. A commitment deposit may be required for loans above $500,000, which is credited toward closing costs at funding.",
      },
      {
        step: "Expedited Underwriting",
        description:
          "Our bridge loan underwriting is built for speed. We order a rush appraisal or desktop valuation, pull title, verify insurance, and review borrower credentials in parallel rather than sequentially. Most bridge loans clear underwriting within 2 to 5 business days. For repeat borrowers with pre-approved profiles, underwriting can be completed in 24 to 48 hours.",
      },
      {
        step: "Closing and Funding",
        description:
          "We coordinate directly with the title company or closing attorney to prepare documents, schedule signing, and wire funds. Bridge loan closings are streamlined with fewer documents than conventional transactions. Funds are wired to the title company on the day of closing, and you take possession of the property immediately. The entire process from first contact to funded loan can be as short as 3 to 7 business days.",
      },
    ],
    useCases: [
      {
        title: "Time-Sensitive Acquisitions",
        description:
          "When a deal requires you to close in days rather than weeks, a bridge loan is the only viable option. Off-market deals, auction purchases, estate sales, and bank-owned property dispositions frequently come with compressed timelines that eliminate conventional financing. A bridge loan ensures you can commit to the deal with confidence and close on the seller's timeline.",
      },
      {
        title: "Gap Financing Between Transactions",
        description:
          "You are selling one property and buying another, but the timings do not align. A bridge loan allows you to close on the purchase before the sale is finalized, using equity in the property being sold or the property being purchased as collateral. When the sale closes, you repay the bridge loan with the proceeds, completing the transition without a gap in ownership.",
      },
      {
        title: "Rescue Capital for Failed Conventional Closings",
        description:
          "Conventional loan approvals fall through more often than borrowers expect, sometimes days before the scheduled closing. When a bank pulls approval at the last minute due to an appraisal issue, underwriting condition, or policy change, a bridge loan can step in to save the deal. We have closed rescue bridge loans in as few as 3 business days to prevent borrowers from losing their earnest money deposit and the deal.",
      },
      {
        title: "Equity Extraction for Down Payments",
        description:
          "Pull equity from a property you already own to fund the down payment on a new acquisition. Rather than waiting months for a conventional cash-out refinance, a bridge loan provides the capital in days. Once the new property is acquired and stabilized, you can refinance both properties into long-term loans and repay the bridge, having used speed and leverage to secure an opportunity that would otherwise have been lost.",
      },
    ],
    faqs: [
      {
        question: "How fast can AssetLift Lending actually close a bridge loan?",
        answer:
          "Our fastest documented closing is 3 business days from application to funding. This is achievable when the borrower has a pre-approved profile with us, the property has a recent appraisal or clear comparable sales data, and the title is clean. For first-time borrowers or properties requiring a new appraisal, 5 to 10 business days is a more realistic expectation. In every case, we structure the process to move as fast as your deal requires.",
      },
      {
        question: "What is the typical interest rate on a bridge loan?",
        answer:
          "Bridge loan interest rates at AssetLift Lending start at 10% and range up to 13% depending on the loan-to-value ratio, borrower experience, property type, and loan term. Bridge loans are priced higher than long-term products because they carry more risk and require significantly more operational resources to originate and manage on compressed timelines. However, because bridge loans are short-term (often repaid within 3 to 12 months), the total interest cost is manageable relative to the value of the deal they enable.",
      },
      {
        question: "Can I use a bridge loan to buy a property at auction?",
        answer:
          "Yes. Bridge loans are one of the best tools for auction purchases. We provide proof-of-funds letters that satisfy auction requirements and can fund the closing within the timeframe mandated by most auction houses (typically 7 to 30 days). If you regularly purchase at auction, establishing a pre-approved borrower profile with AssetLift Lending will allow you to move with maximum speed when the right property comes up for bid.",
      },
      {
        question: "What happens if I cannot repay the bridge loan by the maturity date?",
        answer:
          "If your exit strategy takes longer than anticipated, we offer loan extensions on a case-by-case basis, typically for 3 to 6 months, subject to an extension fee and evidence that the exit is still viable. We strongly encourage borrowers to have realistic timelines and backup exit plans. A bridge loan that matures without a clear path to repayment is a serious situation for both the borrower and the lender, which is why we underwrite the exit strategy as carefully as we underwrite the collateral.",
      },
      {
        question: "Do bridge loans require an appraisal?",
        answer:
          "Most bridge loans require either a full appraisal or a broker price opinion (BPO) to establish the property's current as-is value. For loans under $500,000 in well-documented markets, a BPO or desktop valuation may be sufficient, which can be completed in 2 to 3 days. For larger loans or properties in less liquid markets, a full appraisal is required and typically takes 5 to 7 days. Rush appraisals can often be completed in 2 to 3 days for an additional fee.",
      },
      {
        question: "Can I use a bridge loan to buy out a partner?",
        answer:
          "Yes. Partner buyouts are a common use case for bridge loans. If you co-own a property and need to purchase your partner's equity share, a bridge loan can provide the capital to complete the buyout immediately. You then refinance the property into a long-term loan under your sole ownership (or your entity's ownership) and repay the bridge. This is often faster and simpler than trying to arrange a conventional cash-out refinance to fund the buyout.",
      },
    ],
  },
];
