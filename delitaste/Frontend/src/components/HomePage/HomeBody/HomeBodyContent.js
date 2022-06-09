import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
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
import PickupProvider from "./PickupProvider";
import CategoryGroup from "./CategoryGroup";
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
const glimit = 20;
const goffset = 1;

function HomeBodyContent(props) {
  const { user, getProviderGroup, getAllProvider } = props;
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);
  const [group3, setGroup3] = useState([]);
  const [group4, setGroup4] = useState([]);
  const [group5, setGroup5] = useState([]);
  const [curLimit, setCurLimit] = useState(30);
  const [curOffset, setCurOffset] = useState(1);
  const [allProvider, setAllProvider] = useState([]);
  useEffect(() => {
    async function fetchingDataAPI(la, lo) {
      const result1 = await getProviderGroup(1, glimit, goffset, la, lo);
      setGroup1(result1);
      const result2 = await getProviderGroup(5, glimit, goffset, la, lo);
      setGroup2(result2);
      const result3 = await getProviderGroup(6, glimit, goffset, la, lo);
      setGroup3(result3);
      const result4 = await getProviderGroup(7, glimit, goffset, la, lo);
      setGroup4(result4);
      const all = await getAllProvider(curLimit, curOffset, la, lo);
      setAllProvider(all);
      const result5 = await getProviderGroup(5, 2, goffset, la, lo);
      setGroup5(result5);
    }
    if (user.currentAddress.loading)
      fetchingDataAPI(
        user.currentAddress.latitude,
        user.currentAddress.longitude
      );
  }, [user.currentAddress.loading]);

  const fetchMoreProvider = async () => {
    if (user.currentAddress.loading) {
      const result = await getAllProvider(
        curLimit,
        curOffset,
        user.currentAddress.latitude,
        user.currentAddress.longitude
      );
      const newList = allProvider.concat(result);
      setAllProvider(newList);
    }
  };
  return (
    <Fragment>
      <div className="home-content-provider">
        {props.currentSortMode == 1 && (
          <Fragment>
            <ProviderGroup
              groupTitle={providerGroup[0].group_title}
              groupDescription={providerGroup[0].group_description}
              providerList={group1}
            />
            <ProviderGroup
              groupTitle={providerGroup[1].group_title}
              groupDescription={providerGroup[1].group_description}
              providerList={group2}
            />{" "}
            <PickupProvider
              providerList={group5}
              providerNearby={group1}
              currentLatitude={
                user.currentAddress.latitude || 10.773031146281017
              }
              currentLongitude={
                user.currentAddress.longitude || 106.7060806090524
              }
            />
            <CategoryGroup groupTitle={"Explore by category"} />
            <ProviderGroup
              groupTitle={providerGroup[2].group_title}
              groupDescription={providerGroup[2].group_description}
              providerList={group3}
            />
            <ProviderGroup
              groupTitle={providerGroup[3].group_title}
              groupDescription={providerGroup[3].group_description}
              providerList={group4}
            />
          </Fragment>
        )}
        <Fragment>
          <ProviderShowAll providerList={allProvider} />
          <ButtonGroup float="center" mgTop={10} mgBottom={30}>
            <Button
              onClick={() => {
                setCurOffset((prev) => prev + 1);
                fetchMoreProvider();
              }}
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
