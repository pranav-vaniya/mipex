import { IPO, IPOType } from "@/types/ipo";
import styles from "../../styles/IpoCard.module.css";
import { useState } from "react";

interface IPOProps {
	ipo: IPO;
	showDates?: boolean;
	showBidAmount?: boolean;
}

const IpoCard = ({ ipo, showDates = false, showBidAmount = false }: IPOProps) => {
	let bidAmount = 0;
	const [lotCount, setLotCount] = useState(1);

	if (showBidAmount) bidAmount = 1 * Number(ipo.lotSize) * getMaxPrice(ipo.priceRange);

	return (
		<div className={styles.container}>
			<div className={styles.cardHeader}>
				{ipo.type && (
					<div className={styles.typeContainer}>
						{ipo.type === IPOType.MAINBOARD && <span className={`${styles.typeSpan} ${styles.mainboard}`}>M</span>}
						{ipo.type === IPOType.SME && <span className={`${styles.typeSpan} ${styles.sme}`}>S</span>}
					</div>
				)}
				<div className={styles.nameContainer}>
					<span className={styles.nameSpan}>{ipo.name}</span>
				</div>
			</div>
			{((showBidAmount && ipo.priceRange && ipo.lotSize) || showDates || showBidAmount) && (
				<div className={styles.cardBody}>
					{showBidAmount && ipo.priceRange && ipo.lotSize && (
						<span className={styles.priceSpan}>
							{getMinPrice(ipo.priceRange)}-{getMaxPrice(ipo.priceRange)} · {ipo.lotSize}
						</span>
					)}
					<div className={styles.bodyDiv}>
						{showDates && (
							<div className={styles.datesContainer}>
								<span className={`${styles.dateSpan} ${getDateStatus("start", ipo.schedule)}`}>{getDay(ipo.schedule.startDate)}</span>
								<span className={`${styles.dateSpan} ${getDateStatus("end", ipo.schedule)}`}>{getDay(ipo.schedule.endDate)}</span>
								<span className={`${styles.dateSpan} ${getDateStatus("allotment", ipo.schedule)}`}>{getDay(ipo.schedule.allotmentFinalization)}</span>
								<span className={`${styles.dateSpan} ${getDateStatus("listing", ipo.schedule)}`}>{getDay(ipo.schedule.listingDate)}</span>
							</div>
						)}
						{showBidAmount && (
							<div className={styles.bidAmoundContainer}>
								<button type="button" className={styles.bidAmountBtn} onClick={() => setLotCount((count) => Math.max(1, count - 1))}>
									-
								</button>
								<span className={styles.bidAmountSpan}>{lotCount * Number(ipo.lotSize) * getMaxPrice(ipo.priceRange)}</span>
								<button type="button" className={styles.bidAmountBtn} onClick={() => setLotCount((count) => count + 1)}>
									+
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

function getDay(date: string) {
	return date.split("-")[2];
}

function getMaxPrice(priceRange: string): number {
	return Number(priceRange.split("–")[1].replace("₹", "").trim());
}

function getMinPrice(priceRange: string): number {
	return Number(priceRange.split("–")[0].replace("₹", "").trim());
}

function getDateStatus(type: "start" | "end" | "allotment" | "listing", schedule: IPO["schedule"]) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const start = new Date(schedule.startDate);
	const end = new Date(schedule.endDate);
	const allotment = new Date(schedule.allotmentFinalization);
	const listing = new Date(schedule.listingDate);

	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);
	allotment.setHours(0, 0, 0, 0);
	listing.setHours(0, 0, 0, 0);

	switch (type) {
		case "start":
			return today < start ? styles.upcoming : styles.completed;

		case "end":
			return today < start ? styles.upcoming : today <= end ? styles.ongoing : styles.completed;

		case "allotment":
			return today <= end ? styles.upcoming : today <= allotment ? styles.ongoing : styles.completed;

		case "listing":
			return today <= allotment ? styles.upcoming : today <= listing ? styles.ongoing : styles.completed;
	}
}

export default IpoCard;
