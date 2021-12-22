import "./Tutorial.scss";
import TutorialCard from "components/MerchantRegistration/GuidePage/Tutorials/TutorialCard";
import { useState } from "react";
import { withRouter } from "react-router-dom";

import RegistrationProcedureIcon1 from "assets/Banner/merchant-registration-step1.png";
import RegistrationProcedureIcon2 from "assets/Banner/merchant-registration-step2.png";
import RegistrationProcedureIcon3 from "assets/Banner/merchant-registration-step3.png";

function Tutorial(props) {
  const [cardDetails, setCardDetail] = useState([
    {
      id: 0,
      image: RegistrationProcedureIcon1,
      title: "Provide restaurant info",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt mi nulla, sit amet porta metus feugiat vel.",
    },
    {
      id: 1,
      image: RegistrationProcedureIcon2,
      title: "Sign business contract",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt mi nulla, sit amet porta metus feugiat vel. ",
    },
    {
      id: 2,
      image: RegistrationProcedureIcon3,
      title: "Start online business",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt mi nulla, sit amet porta metus feugiat vel. ",
    },
  ]);
  return (
    <div className="tutorial-section">
      <span className="tutorial-title">Take your business further</span>

      <span className="tutorial-sub-title">Online registration</span>
      <div className="card-details-wrapper">
        {cardDetails.map((cardDetail) => (
          <TutorialCard key={cardDetail.id} card={cardDetail} />
        ))}
      </div>
      <button className="btn-guide-register-now">Register Now</button>
    </div>
  );
}

export default withRouter(Tutorial);
