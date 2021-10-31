import { Fragment } from "react";
import "./ProviderList.css";
import ProviderImage1 from "../../../../assets/ProviderImage/ProviderImage1.jpg";
import ProviderImage2 from "../../../../assets/ProviderImage/ProviderImage2.jpg";
import ProviderImage3 from "../../../../assets/ProviderImage/ProviderImage3.jpg";
import ProviderImage4 from "../../../../assets/ProviderImage/ProviderImage4.jpg";
import ProviderImage5 from "../../../../assets/ProviderImage/ProviderImage5.jpg";
import ProviderImage6 from "../../../../assets/ProviderImage/ProviderImage6.jpg";

function ProviderList(props) {
  return (
    <Fragment>
      <div className="provider-list-wrapper">
        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage1} />
          </div>
          <span className="provider-name">
            Pizza Hut - For the love of Pizza
          </span>
          <span className="provider-address">
            543/65 Nguyen Dinh Chieu, district 3, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>

        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage2} />
          </div>
          <span className="provider-name">
            Kentucky Fried Chicken - Tasty Til The Last Drop
          </span>
          <span className="provider-address">
            12 Bui Thi Xuan, district 1, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>

        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage3} />
          </div>
          <span className="provider-name">
            Thai Express - Best HotPot In The World
          </span>
          <span className="provider-address">
            76 Nguyen Thi Minh Khai, district 3, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>

        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage4} />
          </div>
          <span className="provider-name">
            Baskin Robin - Freeze The Summer
          </span>
          <span className="provider-address">
            65 Nguyen Thien Thuat, district 3, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>

        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage5} />
          </div>
          <span className="provider-name">
            Phuc Long - For The Happiness and Smile
          </span>
          <span className="provider-address">
            150 Vo Van Tan, district 3, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>

        <div className="provider-card">
          <div className="provider-photo">
            <img src={ProviderImage6} />
          </div>
          <span className="provider-name">
            Burger King - Real Beef and Nice Bun
          </span>
          <span className="provider-address">
            24 Nguyen Tri Phuong, district 5, Ho Chi Minh City
          </span>
          <div className="provider-rate"></div>
          <div className="further-more">More Details</div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProviderList;
