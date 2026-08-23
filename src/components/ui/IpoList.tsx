"use client";

import { useEffect, useState } from "react";
import IpoCard from "./IpoCard";
import SectionTitle from "./SectionTitle";
import styles from "../../styles/IpoList.module.css";
import { IPO, IPOApiResponse, IPOStatus, IPOType } from "@/types/ipo";

const IpoList = () => {
	const [ipos, setIpos] = useState<IPO[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchIPOs() {
			try {
				const response = await fetch("https://finapi.upvaly.com/api/ipo");

				if (!response.ok) {
					throw new Error("Failed to fetch IPO data");
				}

				const result: IPOApiResponse = await response.json();
				setIpos(result.data);
			} catch (err) {
				setError("Failed to load IPOs");
			} finally {
				setLoading(false);
			}
		}

		fetchIPOs();
	}, []);

	const sortByType = (ipos: IPO[]) => {
		const typeOrder: Record<IPOType, number> = {
			[IPOType.MAINBOARD]: 0,
			[IPOType.SME]: 1,
			[IPOType.SSE]: 2,
		};

		return [...ipos].filter((ipo) => ipo.type === IPOType.MAINBOARD || ipo.type === IPOType.SME).sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
	};

	const liveIpos = sortByType(ipos.filter((ipo) => ipo.status === IPOStatus.LIVE));
	const closedIpos = sortByType(ipos.filter((ipo) => ipo.status === IPOStatus.CLOSED));
	const upcomingIpos = sortByType(ipos.filter((ipo) => ipo.status === IPOStatus.UPCOMING && ipo.schedule));

	if (loading) {
		return <p>Loading IPOs...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className={styles.container}>
			{liveIpos.length > 0 && (
				<div className={styles.sectionContainer}>
					<SectionTitle title="Live" />

					<div className={styles.ipoCardsContainer}>
						{liveIpos.map((ipo) => (
							<IpoCard key={ipo.symbol} ipo={ipo} showDates showBidAmount />
						))}
					</div>
				</div>
			)}

			{upcomingIpos.length > 0 && (
				<div className={styles.sectionContainer}>
					<SectionTitle title="Upcoming" />

					<div className={styles.ipoCardsContainer}>
						{upcomingIpos.map((ipo) => (
							<IpoCard key={ipo.symbol} ipo={ipo} showDates showBidAmount />
						))}
					</div>
				</div>
			)}

			{closedIpos.length > 0 && (
				<div className={styles.sectionContainer}>
					<SectionTitle title="Closed" />

					<div className={styles.ipoCardsContainer}>
						{closedIpos.map((ipo) => (
							<IpoCard key={ipo.symbol} ipo={ipo} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default IpoList;
