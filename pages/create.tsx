// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');



  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

//このコードは、ReactのSyntheticEventを使用して、フォームのデータを収集し、それをJSON形式でAPIエンドポイントに送信し、その後、成功した場合に/draftsにリダイレクトします。エラーが発生した場合は、エラーをコンソールにログに記録します。
// 詳細を説明すると、以下のようになります。
// const submitData = async (e: React.SyntheticEvent) => {...} : submitData という名前の関数を作成しています。関数のパラメーターとして e を受け取り、このパラメータはReactのSyntheticEventを表します。この関数は非同期関数（ async ）です。
// e.preventDefault(); : preventDefault()を呼び出すことで、フォームのデフォルトの送信動作を防止しています。
// const body = { title, content }; : title と content という2つの変数の値を持つ body オブジェクトを作成しています。
// await fetch('/api/post', {... : fetch() メソッドを使用して、APIエンドポイントにPOSTリクエストを送信しています。リクエストのオプションとしては、HTTPメソッド、ヘッダー、およびリクエストボディが含まれます。
// await Router.push('/drafts'); : 成功した場合、Router.push() を使用して /drafts ページにリダイレクトしています。
// console.error(error); : 失敗した場合、エラーメッセージをコンソールに出力します。



  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;