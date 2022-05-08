import "./SearchContent.scss";
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
import { searchAPI } from "store/actions/ProductAction/ProductAction";
const long = 106.68250448518744;
const lat = 10.763019107348029;

function SearchContent(props) {
  const { setTotalResult, searchAPI, query, type } = props;
  const [allProvider, setAllProvider] = useState([]);
  useEffect(() => {
    async function fetchingSearchAPI() {
      const searchResult = await searchAPI(query, type, long, lat);
      if (searchResult) {
        setAllProvider(searchResult.items);
        setTotalResult(searchResult.total_count);
      }
    }
    fetchingSearchAPI();
  }, [query, type]);

  return (
    <Fragment>
      <div className="home-content-provider">
        <ProviderShowAll providerList={allProvider} />
      </div>
    </Fragment>
  );
}

SearchContent.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  searchAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { searchAPI })(SearchContent)
);
