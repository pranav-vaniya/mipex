export interface IPO {
	symbol: string;
	type: IPOType;
	name: string;
	detailsUrl: string;
	logoUrl: string;
	priceRange: string;
	lotSize: string;
	status: IPOStatus;
	schedule: {
		startDate: string;
		endDate: string;
		listingDate: string;
		upiMandateDeadline: string;
		allotmentFinalization: string;
		refundInitiation: string;
		shareCredit: string;
		mandateEndDate: string;
		lockInEndDateAnchor50: string;
		lockInEndDateAnchorRemaining: string;
	};
	issueSize: {
		totalIssueSize: string;
		freshIssue: string;
		offerForSale: string;
	};
	aboutCompany: string;
	utilizationOfProceeds: {
		capitalExpenditure: string;
		repaymentOfBorrowings: string;
		workingCapital: string | null;
		generalCorporatePurpose: string;
	};
	strengths: string[];
	risks: string[];
	greyMarketPremium: {
		gmpSource: string;
		gmpTrends: string | null;
	};
	subscriptionNumbers: {
		institutional: {
			reserved: string;
			applied: string;
			subscription: string;
		};
		nii: {
			reserved: string;
			applied: string;
			subscription: string;
		};
		retail: {
			reserved: string;
			applied: string;
			subscription: string;
		};
		total: {
			reserved: string;
			applied: string;
			subscription: string;
		};
	};
}

export enum IPOStatus {
	LIVE = "LIVE",
	UPCOMING = "UPCOMING",
	CLOSED = "CLOSED",
}

export enum IPOType {
	MAINBOARD = "Mainboard",
	SME = "SME",
	SSE = "SSE",
}

export interface IPOApiResponse {
	status: string;
	statusCode: number;
	message: string;
	data: IPO[];
}
