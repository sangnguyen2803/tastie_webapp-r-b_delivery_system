import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  getProviderGroup,
  getAllProvider,
} from "store/actions/HomeAction/HomeAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProviderGroup from "components/HomePage/HomeBody/ProviderGroup";
import ProviderShowAll from "components/HomePage/HomeBody/ProviderShowAll";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
const providerGroup = [
  {
    group_title: "In a rush?",
    group_description: "Here’s the fastest delivery for you",
  },
  {
    group_title: "Orders near you",
    group_description: "Your neighborhood’s latest orders",
  },
  {
    group_title: "Today's offers",
    group_description: "",
  },
  {
    group_title: "Popular near you",
    group_description: "",
  },
  {
    group_title: "Double the Savings",
    group_description: "",
  },
];
const groupLimit = 20;
const groupOffset = 1;
const longitude = 106.68250448518744;
const latitude = 10.763019107348029;
function HomeBodyContent(props) {
  const [loading, setLoading] = useState(true);
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(30);
  const [currentOffset, setCurrentOffset] = useState(1);
  const [allProvider, setAllProvider] = useState([]);
  useEffect(() => {
    async function fetchingDataAPI() {
      setLoading(false);
      const result1 = await props.getProviderGroup(
        1,
        groupLimit,
        groupOffset,
        latitude,
        longitude
      );
      setGroup1(result1);
      const result2 = await props.getProviderGroup(
        5,
        groupLimit,
        groupOffset,
        latitude,
        longitude
      );
      setGroup2(result2);
      const result3 = await props.getProviderGroup(
        6,
        groupLimit,
        groupOffset,
        latitude,
        longitude
      );
      setGroup3(result3);
      const result4 = await props.getProviderGroup(
        7,
        groupLimit,
        groupOffset,
        latitude,
        longitude
      );
      setGroup4(result4);
      setLoading(true);
    }

    fetchingDataAPI();
  }, []);
  useEffect(() => {
    async function fetchingDataAPI() {
      const result = await props.getAllProvider(
        currentLimit,
        currentOffset,
        latitude,
        longitude
      );
      const newList = allProvider.concat(result);
      setAllProvider(newList);
    }
    fetchingDataAPI();
  }, [currentOffset]);
  return (
    <Fragment>
      <div className="home-content-provider">
        {props.currentSortMode == 1 && (
          <Fragment>
            {group1?.length > 0 && loading && (
              <ProviderGroup
                groupTitle={providerGroup[0].group_title}
                groupDescription={providerGroup[0].group_description}
                providerList={group1}
              />
            )}
            {group2?.length > 0 && loading && (
              <ProviderGroup
                groupTitle={providerGroup[1].group_title}
                groupDescription={providerGroup[1].group_description}
                providerList={group2}
              />
            )}
            {group3?.length > 0 && loading && (
              <ProviderGroup
                groupTitle={providerGroup[2].group_title}
                groupDescription={providerGroup[2].group_description}
                providerList={group3}
              />
            )}
            {group4?.length > 0 && loading && (
              <ProviderGroup
                groupTitle={providerGroup[3].group_title}
                groupDescription={providerGroup[3].group_description}
                providerList={group4}
              />
            )}
          </Fragment>
        )}
        {allProvider?.length > 0 && (
          <Fragment>
            <ProviderShowAll providerList={allProvider} />
            <ButtonGroup float="center" mgTop={10} mgBottom={30}>
              <Button
                onClick={() => setCurrentOffset((prev) => prev + 1)}
                color={"white"}
                bgColor={"black"}
                justifyContent={"center"}
                gap={"10px"}
                width={130}
                fontSize={14}
                height={40}
                label={"Show More"}
              />
            </ButtonGroup>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

HomeBodyContent.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProviderGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProviderGroup, getAllProvider })(
    HomeBodyContent
  )
);
