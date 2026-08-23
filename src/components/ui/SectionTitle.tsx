import styles from "../../styles/SectionTitle.module.css";

interface SectionTitleProps {
	title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
	return <p className={styles.sectionTitle}>{title}</p>;
};

export default SectionTitle;
