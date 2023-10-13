import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';
import Button from '@fellesdatakatalog/button';
import withCommunity, {
  Props as CommunityProps
} from '../../components/with-community';
import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../error-page';
import SC from './styled';
import { formatDate } from '../../lib/date-utils';
import Banner from '../../components/banner';
import localization from '../../lib/localization';
import env from '../../env';

const { FDK_COMMUNITY_BASE_URI } = env;
interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  topics,
  communityActions: { searchRequestsRequested }
}) => {
  useEffect(() => {
    searchRequestsRequested('');
  }, []);

  const notDeletedRequests = topics?.filter(topic => topic.deleted === 0);
  const [search, setSearch] = useState('');

  return (
    <>
      <Banner title={localization.requestsPage.title} />
      <main id='content' className='container'>
        <SC.FirstRow>
          <SC.InfoText>
            <p>
              {localization.formatString(localization.requestsPage.ingress, {
                lenke: (
                  <Link href={FDK_COMMUNITY_BASE_URI} external>
                    {localization.community.title}
                  </Link>
                )
              })}
            </p>
          </SC.InfoText>
          <SC.Button>
            <Button
              onClick={() => {
                window.location.href = `${FDK_COMMUNITY_BASE_URI}/category/6`;
              }}
            >
              {localization.requestsPage.createRequest}
            </Button>
          </SC.Button>
        </SC.FirstRow>
        <SC.FirstRow>
          <SC.Row>
            <Button
              onClick={() => searchRequestsRequested(search, 'timestamp')}
            >
              {localization.requestsPage.newestToOldest}
            </Button>
            <Button onClick={() => searchRequestsRequested(search, 'upvotes')}>
              {localization.requestsPage.mostVotes}
            </Button>
            <Button
              onClick={() => searchRequestsRequested(search, 'topic.viewcount')}
            >
              {localization.requestsPage.mostViews}
            </Button>
          </SC.Row>
          <SC.Row>
            <input
              type='text'
              onChange={event => setSearch(event.target.value)}
            />
            <Button onClick={() => searchRequestsRequested(search)}>Søk</Button>
          </SC.Row>
        </SC.FirstRow>
        <SC.RequestsTitleRow>
          <SC.RequestTitle>
            {localization.requestsPage.requests}
          </SC.RequestTitle>
          <SC.RequestInfo>{localization.date}</SC.RequestInfo>
          <SC.RequestInfo>{localization.requestsPage.votes}</SC.RequestInfo>
          <SC.RequestInfo>{localization.requestsPage.views}</SC.RequestInfo>
        </SC.RequestsTitleRow>
        {notDeletedRequests &&
          notDeletedRequests.map(topic => (
            <SC.RequestRow role='table' key={topic.cid}>
              <SC.RequestLink
                href={`${FDK_COMMUNITY_BASE_URI}/topic/${topic.slug}`}
              >
                {topic.title}
              </SC.RequestLink>
              <SC.RequestInfo>
                {formatDate(new Date(topic.timestampISO))}
              </SC.RequestInfo>
              <SC.RequestInfo>{topic.upvotes}</SC.RequestInfo>
              <SC.RequestInfo>{topic.viewcount}</SC.RequestInfo>
            </SC.RequestRow>
          ))}
        <SC.InfoBox>
          <SC.Text>
            <h3>{localization.requestsPage.requestData}</h3>
            <p>{localization.requestsPage.requestDataInfo}</p>
          </SC.Text>
          <Button
            onClick={() => {
              window.location.href = `${FDK_COMMUNITY_BASE_URI}/category/6`;
            }}
          >
            {localization.requestsPage.createRequest}
          </Button>
        </SC.InfoBox>
      </main>
    </>
  );
};

const enhance = compose(withCommunity, withErrorBoundary(ErrorPage));
export default enhance(RequestsPage);
