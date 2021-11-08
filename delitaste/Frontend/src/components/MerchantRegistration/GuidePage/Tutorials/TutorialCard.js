import "./TutorialCard.css";

function TutorialCard({ card }) {
  return (
    <div className="tutorial-card-container">
      <div className="card-content">
        <img className="card-image" src={card.image} />
        <span className="card-title">{card.title}</span>
        <span className="card-description">{card.description}</span>
      </div>
    </div>
  );
}

export default TutorialCard;
