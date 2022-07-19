import { useState, useEffect, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../RateShipper/RateShipper.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";

import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import ReactStars from "react-rating-stars-component";
import { ratingOrderAPI } from "store/actions/OrderAction/OrderAction";

function RateProvider(props) {
  const { orderSummary } = props;
  const [rating, setRating] = useState(5);
  const [ratingTitle, setRatingTitle] = useState();
  const [comment, setComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState("");
  const ratingChanged = (newRating) => {
    const level = ["Too bad", "Bad", "Neutral", "Delicious", "Perfect"];
    setRatingTitle(level[newRating - 1]);
    setRating(newRating);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const handleSubmitRating = async () => {
    const data = {
      order_id: orderSummary.order_id,
      create_at: new Date().toISOString().split("T")[0],
      content: comment,
      stars: rating,
      image: "",
    };
    console.log(data);
    const status = await props.ratingOrderAPI(data);
    if (status) {
      props.setVisible(false);
    }
  };

  return (
    <Fragment>
      <div className="rate-shipper-feedback-container">
        <div className="rshi-fb-wrapper">
          <div className="rsh-fb-rating">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              value={0}
              size={48}
              emptyIcon={<i className="far fa-star"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor={"#AB2E15"}
            />
          </div>
          {ratingTitle && <div className="rshi-fb-sub-text">{ratingTitle}</div>}
          {rating < 3 && (
            <Fragment>
              <span className="rshi-fb-main-text-medium">
                Sincerely sorry for this bad experience.
                <br />
                Please report your problems and include evidences to us.
              </span>
              <div className="rshi-fb-compliments">
                {[
                  "Too salty",
                  "Too sweet",
                  "Disgusting",
                  "The food is getting cold",
                  "Very bad",
                ].map((item, index) => (
                  <div
                    className="rshi-fb-compliment-tag"
                    onClick={() => {
                      setComment((prev) => prev + "[" + item + "] ");
                      if (selectedTags.includes(item)) {
                        let copy = [...selectedTags];
                        copy.splice(copy.indexOf(item), 1); // remove item
                        setSelectedTags(copy);
                      } else {
                        setSelectedTags((prev) => [...prev, item]);
                      }
                    }}
                    key={index}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(230,230,230,0.7)",
                      marginRight: index === 4 ? 0 : 10,
                      marginBottom: 10,
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          {rating >= 3 && (
            <Fragment>
              <span className="rshi-fb-main-text-medium">
                Share your compliments:
              </span>
              <div className="rshi-fb-compliments">
                {[
                  "Yummy!",
                  "Affordable",
                  "Good packaging",
                  "Filling",
                  "Good food appearance",
                ].map((item, index) => (
                  <div
                    className="rshi-fb-compliment-tag"
                    onClick={() => {
                      setComment((prev) => prev + "[" + item + "] ");
                      if (selectedTags.includes(item)) {
                        let copy = [...selectedTags];
                        copy.splice(copy.indexOf(item), 1); // remove item
                        setSelectedTags(copy);
                      } else {
                        setSelectedTags((prev) => [...prev, item]);
                      }
                    }}
                    key={index}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "rgba(230,230,230,0.7)",
                      marginRight: index === 4 ? 0 : 10,
                      marginBottom: 10,
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
          <div className="rshi-fb-comment">
            <div className="rshi-fb-text-area-wrapper">
              <textarea
                className="rshi-fb-text-area"
                name="comment"
                value={comment}
                placeholder="Share review about taste, package or each item"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <span className="rshi-fb-word-counter">{comment.length}/150</span>
          </div>
          <div className="homebody-sb-radio-detail-wrapper">
            <label className="hb-sb-type-wrapper radio">
              <input type="radio" name="sortType" value={1} />
              <span className="hb-sb-label-radio">
                Make my rating and review anonymous
              </span>
            </label>
          </div>
          <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
            <Button
              color={"white"}
              bgColor={"#2c2c2c"}
              justifyContent={"center"}
              gap={"10px"}
              width={120}
              fontSize={14}
              height={35}
              onClick={() => handleSubmitRating()}
              label={`Submit`}
            />
          </ButtonGroup>
        </div>
      </div>
    </Fragment>
  );
}

RateProvider.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  ratingOrderAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(
    connect(mapStateToProps, {
      ratingOrderAPI,
    })(RateProvider)
  )
);
