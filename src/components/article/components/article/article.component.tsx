import React, { FC, memo } from 'react';

import SC from './styled';
import { NewsItemAttributes } from '../../../../types';
import { convertToSanitizedHtml } from '../../../../lib/markdown-converter';
import { getTranslateText } from '../../../../lib/translateText';

interface Props {
  article: Partial<NewsItemAttributes>;
}

const Article: FC<Props> = ({
  article: {
    title = '',
    field_ingress: abstract = '',
    body = '',
    video_link,
    field_modules
  }
}) => {
  const fieldBody = field_modules?.find(
    (item: any) => item.type === 'paragraph--body'
  );
  return (
    <SC.Article>
      <SC.Title>{getTranslateText(title)}</SC.Title>
      <SC.Abstract
        dangerouslySetInnerHTML={{
          __html: convertToSanitizedHtml(abstract)
        }}
      />
      <SC.Body
        dangerouslySetInnerHTML={{
          __html: convertToSanitizedHtml(fieldBody?.field_body?.value ?? body)
        }}
      />
      {video_link && (
        <SC.Video>
          <iframe
            title={getTranslateText(title)}
            src={video_link}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </SC.Video>
      )}
    </SC.Article>
  );
};

export default memo(Article);
