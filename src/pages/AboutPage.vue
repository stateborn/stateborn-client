<template>
  <q-page class="noise text-subtitle1" :class="$q.platform.is.mobile ? 'q-pa-xs' : ''">
    <div class="row justify-center q-pt-lg">
      <div class="col-lg-6 col-xs-grow">
        <div class="row">
          <div class="col-12">
            <div class=" text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">About</div>
            Stateborn is a DAO governance platform. It allows to create and manage Decentralized Autonomous Organizations (DAO) using
            decentralized technology such as blockchain, IPFS and cryptography.<br><br>
            What is a DAO? It can be any governance required community.
            It could be a crypto/blockchain project. It could be a company. But it could be also a school council,
            online game community or any non-profit organization like a charity, political organization or even... a country.
            <br><br>
            DAO is about fairness. Our mission is to help building better DAOs.
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-lg-12 col-xs-12">
        <div class="row">
          <div class="col-12">
            <transition
              appear
              style="animation-duration: 2s"
              mofr="out-in"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <picture-parallax image-src="browsepropsnoise.webp" alt="stateborn image"
                                title="stateborn - minimum trust democracy"
                                :speed="$q.platform.is.mobile ? 0.1 : 0.6"
                                :style="$q.platform.is.mobile ? 'height: 100px !important': 'height: 200px'"
                                :text-class="$q.platform.is.mobile ? 'text-subtitle2 text-black': 'text-h4 q-pa-md'"
                                :height="$q.platform.is.mobile ? '979' : ''">
              </picture-parallax>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-lg-6 col-xs-grow">
        <div class="row q-pt-lg">
          <div class="col-12">
            <div class="text-h3 text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">Anatomy of stateborn DAO</div>
            <div class="q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">DAO definition document</div>
            A stateborn DAO definition document contains all the information about the DAO.
            Every DAO definition document is an immutable document saved in IPFS.
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Governance token</div>
            Every DAO has a blockchain token which represents the share of the DAO.
            Users owning a token can create proposals and vote on them.
            DAO token can be ERC-20 or NFT.
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Proposals</div>
            Users owning a DAO token can create proposals. It can be anything that requires a voting from the DAO community.
            Every proposal is an immutable document saved in IPFS.
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Votes</div>
            Users owning a DAO token can vote on proposals.
            Every vote is an immutable document saved in IPFS.
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Proposal reports</div>
            A proposal report is a proposal voting summary generated when the proposal voting period ends.
            It allows to validate all the votes and obtain final proposal decision result.
            Every proposal report is an immutable document saved in IPFS.<br><br><br>

            Creating DAOs, proposals and votes is cryptographically client side signed by the users. This provides a digital data seal
            which allows to prove validity, authenticity and ownership of every single DAO related data.<br><br>

            All stateborn DAO related data except token definition is saved off-chain - in IPFS.
            InterPlanetary File System (IPFS) is a decentralized file storage where data saved is immutable and publicly
            available to everyone.

            <q-banner dense class="q-mt-md q-mb-xs state noisegreencard">
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-lightbulb" color="primary" />
              </template>
              Every DAO, proposal, vote and proposal report is an immutable document saved in IPFS. Every DAO, proposal and vote
              is cryptographically client side signed by the users. This provides a digital data seal which allows to prove validity, authenticity and ownership of every single DAO related data.
            </q-banner>

            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Stateborn DAO = blockchain + IPFS + cryptography</div>

            All stateborn DAOs data is cryptographically secured data saved in IPFS and blockchain.
            Governance token saved in blockchain allows to interact with DAOs and their data saved in IPFS.
            The role of stateborn.org is to provide a technical infrastructure for processing DAOs data but it has no control over the authenticity
            of the data. Data cryptographically signed by the users saved in IPFS/blockchain are available
            to everyone and its validity can be verified by anyone.<br>
          </div>
        </div>

        <div class="row q-mt-lg">
          <div class="col-12">
            <div class="text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">What makes stateborn unique?</div>
            Stateborn design philosophy is to <b>minimize trust in the third party as much as possible</b>.
            The ideal scenario is to completely eliminate third party and blockchain is the solution to this problem.
            However, usage of blockchain has a cost, and the industry has already proved that this cost
            is incommensurate to most DAO use-cases.
            This is why stateborn follows the off-chain governance model with the minimal role of a centralized third party. <br><br>
            That said, here are some key stateborn features and architecture details:
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">Stateborn backend doesn't add any data to DAOs, proposals or votes</div>
            Every single "business" data is created client side and cryptograhically client signed by the users. Backend after receiving the data from a client,
            only validates the data before saving it to IPFS. It is possible to retrieve all the DAOs, proposals and votes related information directly from
            blockchain and IPFS. Proposals attachments like images or PDF documents are directly encoded in IPFS document.

            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'"> Every DAO, proposal, user vote and proposal report is client side validated with IPFS</div>
            Data returned by stateborn backend is validated with data saved in IPFS. It eliminates the possibility to rely on malformed
            or incorrect data from the backend. In any case of stateborn backend data manipulation, user will see the validation result in stateborn.org interface.
            Moreover, users have the possibility to <b>set custom IPFS gateway address in stateborn.org user interface</b> in order to validate the data with custom IPFS gateway.

            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'"> Every DAO, proposal, user vote and proposal report is stored in the client side database (IndexedDB)</div>
            Every DAO, proposal and user vote related data is saved to user's Internet browser database (IndexedDB). DAOs, proposals and proposal reports are
            saved to client database after first fetching from backend and validation with IPFS. User votes are saved to client database
            even before sent to backend in order to examine the possibility of stateborn backend votes censorship (not submission).
            This enhances the process of client side validation but also provides theoretically the possibility to rebuild the DAO
            in case of stateborn.org shutdown or data removal.
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-lg-6 col-xs-grow">
        <div class="row q-pt-lg">
          <div class="col-12">
            <div class="text-h3 text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">Voting process</div>
            <div class="q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">
              1. User creates a proposal
            </div>
            Every user has the ability to create proposals and vote on them.
            Every proposal an immutable document saved in IPFS.
            Proposals can require a minimum amount of DAO governance tokens to own in order to create proposals. This threshold
            is defined by the DAO creator. Stateborn backend validates the proposal requirements and validity before saving in IPFS.<br><br>
            Proposals contain some "business" data like title, description, attachments, voting period etc. Additionally, every proposal
            has a block number included - the latest block read from a blockchain before submitting the proposal. The block number
            is a reference to counting user votes and is the protection to prevent votes manipulation. If a proposal was created with a block number
            XXX and user A owned 100 governance tokens at block XXX, then user A could vote only with 100 governance tokens.
            If user A received 1000 additional tokens in block XXX + 1, he can still vote only with 100 tokens. <br><br>

            <q-banner dense class="q-mt-xs q-mb-xs noisegreencard" >
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-lightbulb" color="primary" />
              </template>
              Every proposal previewed in stateborn.org interface by any user is validated with IPFS document content.
              This allows to prove the authenticity of the proposal.
            </q-banner>
            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">
              2. Users vote on the proposal
            </div>
            Users vote on proposals. Every vote is an immutable document saved in IPFS.
            Users voting power is the amount of tokens they own. Voting power is calculated directly on the client side and then is
            only verified by stateborn backend services. Users can change their votes. Latest user's vote is considered to be final
            and should be the only one counted. <br><br>

            <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-lightbulb" color="primary" />
              </template>
              Every user vote is saved in stateborn.org user interface client side database (IndexedDB) before sending to backend.
              This can prove the attempts of votes censorship by stateborn backend.
            </q-banner>
            <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-lightbulb" color="primary" />
              </template>
              Every vote of user is client side validated with IPFS document content (fetched client side) after receiving from backend.
              This allows to prove the authenticity of the votes.
            </q-banner>


            <div class="q-pt-md q-pb-xs" :class="$q.platform.is.mobile ? 'text-h5' : 'text-h4'">
              3. Voting period ends. A proposal report is generated.
            </div>
            Proposal report is an IPFS document describing the result of the voting process. It contains the list of users votes
            with references to IPFS documents containing the votes. Based on the proposal report, the final result and voting
            decision can be obtained.

            Every user previewing the ended proposal in stateborn.org interface fetches the proposal report from backend and then directly from IPFS.
            Then the proposal report is validated to include correct single vote of user previewing the proposal.
            In any case of invalid vote inclusion in the proposal report, user will see the validation result in stateborn.org interface.

            <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-lightbulb" color="primary" />
              </template>
              For every ended proposal previewed on stateborn.org interface the proposal report is fetched from backend.
              Then the proposal report document is fetched from IPFS and is verified to include the correct single vote of user previewing the proposal.
            </q-banner>
          </div>
        </div>

        <div class="row q-pt-lg">
          <div class="col-12">
            <div class="text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">How to create a DAO?</div>
            Stateborn DAO creation is <b>free and available to everyone</b>. There are not any requirements except governance token to be deployed
            on the blockchain network. Stateborn supports ERC-20 and NFT governance tokens.<br><br>

            <router-link to="/create-dao" span class="text-underline text-bold">Click here to create your custom DAO</router-link>
          </div>
        </div>

        <div class="row q-pt-lg justify-center">
          <div class="col-lg-12">
            <div class="text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">Role of stateborn.org</div>

            <div class="row items-center">
              <div class="col-lg-8 col-xs-grow justify-center">
                <span class="text-bold">stateborn.org cannot steal any token, cannot change or modify any DAO, proposal or vote related data. </span><br>
                As a centralized third party in the stateborn DAO ecosystem, stateborn.org application acts as an intermediary between
                users and blockchain/IPFS.
                Its main role is to provide user interface and backend services for operating DAOs.
                Users saving DAO data, send them to stateborn.org backend services where they are validated and saved in blockchain/IPFS.
                Since the data are cryptograhically signed by the users, stateborn.org backend services cannot change them.<br><br>

                We are delighted to provide the solid and honest third party service however we believe tools should be designed to
                eliminate and minimize the need of trust as much as possible.
              </div>
              <div class="col-lg-4 col-xs-grow justify-center">
                <div class="text-center">
                  <q-img
                    class="text-center"
                    :style="$q.platform.is.mobile ? 'height: 200px; width:200px' : 'height: 100%'"
                    src="/stateborn3.gif"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-pt-lg">
          <div class="col-12">
            <div class="text-bold q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">Risks of stateborn DAOs</div>
            We want to design as much trustless off-chain DAO ecosystem as possible. In the same time we want this tool to be user friendly
            and available to big audience.<br><br>
            The only real power stateborn.org has as a centralized infrastructure provider for processing DAOs data
            is <span class="text-bold">the ability to censor the data. </span><br>
            Since there is no technical possibility to modify the data, there is no risk of data manipulation.
            Since data is saved in IPFS and blockchain, there is no risk of data loss or intentional removal. <br>
            However, users can create DAOs, proposals and votes but stateborn.org can decide not to process them.
            Unfortunately, it's impossible to eliminate censorship risk relying on 3th party.
            Our client side data saving and validation strategy is the method to track and prevent the attempts of data censorship by backend.
            The possibility to rely on a custom IPFS gateway is the user-friendly method to partially eliminate trust in
            stateborn infrastructure provider. <br>
            Finally, our software is completely open-source so it's possible for everyone to run it independently.
            <br><br>
          </div>
        </div>
      </div>
    </div>


  </q-page>
<div></div>
</template>
<script setup lang="ts">
import PictureParallax from 'components/PictureParallax.vue';
</script>
