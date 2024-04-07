import Head from "next/head";
import Header from "../components/Header";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
//import config from '../aws-exports';

// Amplify.configure({
//     Auth: {
//         Cognito: {
//             userPoolClientId: '557612919820',
//             userPoolId: 'eu-west-2_K0AH1uos7',
//             identityPoolId: 'eu-west-2:887b10c4-d131-41b2-83bd-9bfa0f17c4c6'
//         }
//     }
// });
Amplify.configure(awsconfig);

const Index: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Munich Re Automation Solution Ltd</title>
      </Head>
      <div className="">
        {/* Title */}
        <div className="w-full py-2 flex flex-col items-center mb-4">
          <h1 className="text-6xl font-bold text-white mb-2">SwEng Group 30</h1>
          <h2 className="text-4xl font-semibold text-white">
            Using AI/ML to Aid Life Insurance Risk Assessment
          </h2>
        </div>

        {/* Chatbot */}
        <div className="w-full flex">
          <div className="w-1/2 px-2 flex flex-col justify-center pl-8">
            <h3 className="text-3xl font-semibold text-white">AI Assistant</h3>
            <p className="text-white">
              We've created an AI powered chatbot assistant using Amazon Lex. It
              speeds up the review process for underwriters.
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <div className="w-1/2 h-96 rounded-md glass-more-opaque p-2">
              <div className="text-left text-sm min-h-6 w-3/5 my-2 p-2 shadow rounded-md bg-white rounded-bl-none">
                Hello, what can I do for you today?
              </div>
              <div className="text-left text-sm min-h-6 w-3/5 my-2 p-2 shadow rounded-md bg-violet-700 text-white rounded-br-none ml-auto">
                Can you get the past policy history for John Smith?
              </div>
              <div className="text-left text-sm min-h-6 w-3/5 my-2 p-2 shadow rounded-md bg-white rounded-bl-none">
                Here you go!
              </div>
              <div className="text-center text-sm min-h-6 w-3/5 my-2 p-2 shadow rounded-md bg-white">
                View response
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
