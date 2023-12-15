import "./TitleSection.scss";

const TitleSection = ({ firstTxt, secondTxt }) => {
    return (
        <>
            <h3 className="s-title-1">{firstTxt} <span>{secondTxt}</span></h3>
        </>
    )
}

export default TitleSection;