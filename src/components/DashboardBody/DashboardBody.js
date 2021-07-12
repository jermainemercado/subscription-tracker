import React, {useState, useEffect} from 'react';
import { Row, Col } from 'reactstrap';
import Button from '../common/Button';
import arrow from '../../assets/images/arrow.svg';
import whitelogo from '../../assets/images/whitelogo.svg';
import Axios from 'axios';
import { TokenError } from 'passport-oauth2';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_yntCy3sFi63sgvtAxK7344Il');

const DashboardBody = () => {
  
  const [discordUser, setDiscordUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('')
  const [accessToken, setAccessToken] = useState('')

  async function cancelPaymentHandler() {
    console.log(discordUser.discordId)
    await Axios.post('/payment/cancelSub', {
      discordId: discordUser.discordId, 
    })
      .then((res) => {
        console.log(res)
        alert(res.data.message)
      }, (err) => {
        console.log(err)
        alert(err.message)
    })
  }

  async function getPaymentStatus() {
    await Axios.get('/payment/status', {
      discordId: discordUser.discordId,
    })
      .then((res) => {
        //console.log(res)
        setPaymentStatus(res.data.paymentStatus)
      }, (err) => {
        console.log(err)
      })
  }

  async function joinClickHandler() {
    let userId = discordUser.discordId;
    console.log(userId);
    console.log(paymentStatus);
    console.log(accessToken);
    await fetch(`/discordBot/joinDiscord?&user=${userId}&paymentInfo=${paymentStatus}&accessToken=${accessToken}`,
    {method: 'GET'});
  }


  const fetchUserData = async () => {
    await Axios.get('/dashboard/getInfo')
      .then(res => {
        //console.log(res)
        //console.log(res.data.userInfo)
        setDiscordUser(res.data.userInfo)
        setAccessToken(res.data.accessToken)
      })
  }

  const updatePaymentInfo = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/payment/updateCardInfo', {method: 'POST'})
    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

  }

  useEffect(() => {
    fetchUserData()
    getPaymentStatus()
    setLoading(false)
  }, [])

  return (
    <div className="dashboardbody">
      <Row>
        <Col lg={5} md={6}>
          <div>
            <label>Your License Key</label>
            {discordUser.licenseKey ? 
            <div className="dashboardbody_licensekey">{discordUser.licenseKey }</div> 
            : 'TK-7PA97-1AS12-6JS89'
            }
          </div>
        </Col>
        <Col lg={4} md={6}>
          <div className="mt-4">
            <div className="mr-5">
              <label>Email Address</label>
              <h6>{discordUser.email ? discordUser.email : 'lkdesignsolutions@gmail.com' }</h6>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={5} md={6}>
          <div className="d-flex mt-4">
            <div className="mr-5">
              <label>Key Type</label>
              <h6>{discordUser.lifetimePayment === true ? 'Lifetime' : 'Monthly'}</h6>
            </div>
            {(!discordUser.lifetimePayment) && (
              <div>
                <label>Subscription Start Date</label>
                <h6>{discordUser.firstPayment ? discordUser.firstPayment.substring(4,15) : ''}</h6>
              </div>
            )}
          </div>
        </Col>
        <Col lg={4} md={6}>
          {(!discordUser.lifetimePayment) && (
            <div className=" mt-4">
              <label>Next Renewal </label>
              <h6>{discordUser.nextDue ? discordUser.nextDue.substring(4,15) : ''}</h6>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        {!discordUser.lifetimePayment && (
          <Col lg={5} md={6}>
            <div className="dashboardbody_card">
              <img
                src={whitelogo}
                alt="whitelogo"
                className="dashboardbody_card_logo"
              />
              <h4>John J. Doe</h4>
              <h3>···· ···· ···· 1234</h3>
              <div className="dashboardbody_card_paymentButton">
                <Button
                  label="Update Payment Method"
                  className="title_gradientBorderBtn"
                  border="gradient"
                  icon={arrow}
                  iconClassName="title_gradientBorderBtn-icon ml-3"
                  handleClick={updatePaymentInfo}
                />
              </div>
            </div>
          </Col>
        )}

        <Col lg={4} md={6}>
          <div>
              <button className="dashboardbody_button dashboardbody_button-join" onClick={joinClickHandler}>
                Join Discord
              </button>
            {!discordUser.lifetimePayment && (
              <button className="dashboardbody_button dashboardbody_button-cancel" onClick={cancelPaymentHandler}>
                Cancel Subscription
              </button>
            )}
            <form action="/dashboard/logout">
              <button className="dashboardbody_button dashboardbody_button-logout" type="submit">
                Log Out
              </button>
            </form>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardBody;
