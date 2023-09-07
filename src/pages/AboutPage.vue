<template>
  <div>
    <q-page class="noise" :class="$q.platform.is.mobile ? 'q-pa-xs text-subtitle2' : 'text-subtitle1'" :style="$q.platform.is.mobile ? 'line-height: 25px' : ''">
      <div class="row items-center justify-center" >
        <div class="col-lg-3 col-xs-auto items-center" v-if="!$q.platform.is.mobile">
          <q-list separator class="q-ma-lg text-grey-9">
            <div v-for="item in items">
              <q-item-label header v-if="item.isLabelOnly">{{ item.label }}</q-item-label>
              <q-item v-else dense clickable v-ripple  @click="scrollToElement(item.scrollTo)" :active="item.active" active-class="greyItem">
                <q-item-section avatar v-if="item.icon !== ''">
                  <q-icon  size="xs" :name="item.icon" />
                </q-item-section>
                <q-item-section avatar v-if="item.img !== ''">
                  <q-img :src="item.img" style="height: 22px; width:22px"></q-img>
                </q-item-section>

                <q-item-section class="text-subtitle2">{{item.label}}</q-item-section>
              </q-item>
              <q-separator v-if="item.separatorAfter" color="grey-9"></q-separator>
            </div>
          </q-list>
        </div>
        <div class="col-lg-9 col-xs-grow">
          <q-scroll-area :style="`height: ${scrollHeight}px; width:100%;`" ref="scrollAreaRef"
                         :bar-style="barStyle" :thumb-style="thumbStyle" @scroll="onScroll">
            <div class="row">
              <div class="col-lg-9 col-xs-12">
                <div class="q-pa-xs">
                  <div class="row">
                    <div class="col-12">
                      <div class="q-pa-lg">
                        <div class="text-center text-h1" id="about">
                          About
                        </div>
                        <div class="text-overline text-center q-pb-md text-sub">Stateborn</div>
                      </div>
                      Stateborn is a DAO governance platform. It allows to create and manage Decentralized Autonomous Organizations (DAO) using
                      decentralized technology such as blockchain, IPFS and cryptography.<br><br>
                      What is a DAO? It can be any governance required community which needs to make decisions in a fair and transparent way.
                      It could be a crypto/blockchain project. It could be a company. But it could be also a school council,
                      online game community or any non-profit organization like a charity, political organization or even... a country. <br><br>
                      Imagine a community of people having truly fair governance process - like a democratic voting system.
                      Participants of DAO owns a token (blockchain token), giving them
                      right to take part in DAO's governance. They propose and they vote.
                      DAO can have a treasury, assets managed by governance decisions.
                      There is no cheating, everything is transparent, votes are easy to calculate,
                      treasury assets are in control of community but non-permissioned. It could work thanks to the blockchain.
                      Interesting right?

                      <br><br>
                      DAO is about fairness. Our mission is to help building better DAOs.
                    </div>
                  </div>

                  <div class="row q-pt-lg">
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
                                          :text-class="$q.platform.is.mobile ? 'text-subtitle2 text-black': 'text-h2 q-pa-md'"
                                          :height="$q.platform.is.mobile ? '979' : ''">
                        </picture-parallax>
                      </transition>
                    </div>
                  </div>

                  <div class="row justify-center">
                    <div class="col-lg-12 col-xs-grow">
                      <div class="row q-pt-lg">
                        <div class="col-12">
                          <div class="q-pa-lg">
                            <div class="text-center text-h1" id="anatomy">
                              Anatomy
                            </div>
                            <div class="text-overline text-center q-pb-md text-sub">of stateborn off-chain DAO</div>
                          </div>
                          Stateborn DAO is hybrid off-chain + on-chain governance protocol. DAO can be only off-chain, or off-chain + on-chain.
                          <ul>
                            <li>
                              <b>off-chain</b> only DAO is a dedicated to communities which
                              wants to utilize no-cost, fast, secure and cryptographically secured off-chain voting using
                              stateborn platform
                            </li>
                            <li>
                              <b>off-chain + on-chain</b> DAO is dedicated to communities who additionally to off-chain voting want to have
                              non-permissioned on-chain DAO treasury, owning and managing assets like cryptocurrency, ERC-20 tokens or NFTs
                            </li>
                          </ul>

                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'">off-chain DAO = cryptography + governance token + IPFS</div>

                          Stateborn off-chain DAO data is cryptographically secured data saved in IPFS and blockchain.
                          Creating DAOs, proposals and votes is cryptographically client side signed by the users.
                          This provides a digital data seal which allows to prove validity, authenticity and ownership of every single DAO related data.<br><br>

                          All stateborn DAO related data, except token definition is saved off-chain - in IPFS.
                          <a href="https://ipfs.tech/" target="_blank">InterPlanetary File System (IPFS)</a> is a distributed file storage where data saved is immutable and publicly
                          available to everyone.
                          Governance token saved in blockchain represents the user's share in DAO.
                          Owning a token allows to interact with DAOs, creating proposals and vote on them.<br><br>

                          The role of <a href="https://stateborn.org" target="_blank">stateborn.org</a> is to provide a technical infrastructure for processing DAOs data but it has no control over the authenticity
                          of the data. Data cryptographically signed by the users saved in IPFS/blockchain are available
                          to everyone and its validity can be verified by anyone.<br><br>

                          on-chain + off-chain DAO mechanics which additionally to off-chain features allows to manage on-chain DAO treasury is described in detail here:
                          <router-link to="/onchain-dao" span class="text-underline text-bold">ABOUT STATEBRON PROTOCOL</router-link><br><br>

                          The description below references to off-chain DAO components - data processed by users and <a href="https://stateborn.org" target="_blank">stateborn.org</a>, saved in IPFS.
                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="daoDefinitionDocument">DAO definition document</div>
                          A stateborn DAO definition document contains all the information about the DAO, such as name, description, logo, governance token,
                          on-chain DAO treasury address (if off-chain + on-chain DAO), proposal requirements, creator's digital signature,etc.
                          Every DAO definition document (JSON) is an immutable document saved in IPFS.
                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="governanceToken">Governance token</div>
                          Every DAO has a blockchain token which represents the share of the DAO.
                          Users owning a token can be part of DAO governance - create proposals and vote on them. The amount of tokens owned by a user is the voting power.
                          Stateborn supports different token standards on various blockchain networks.<br><br>
                          Supported DAO token standards:
                          <ul>
                            <li><q-badge style="padding:5px" label="ERC-20" color="primary" text-color="white"></q-badge> - voting power units is amount of tokens user owns</li>
                            <li><q-badge style="padding:5px" label="NFT" color="secondary" text-color="black"></q-badge> - 1 NFT is 1 voting power unit</li>
                          </ul>
                          Supported blockchain networks:
                          <q-list dense>
                            <q-item>
                              <q-item-section avatar>
                                <q-img src="/ethereum.svg" style="height: 25px; width:25px;"/>
                              </q-item-section>
                              <q-item-section>Ethereum Mainnet</q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section avatar>
                                <q-img src="/arbitrum.svg" style="height: 25px; width:25px;"/>
                              </q-item-section>
                              <q-item-section>Arbitrum One</q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section avatar>
                                <q-img src="/polygon.svg" style="height: 25px; width:25px;"/>
                              </q-item-section>
                              <q-item-section>Polygon Mainnet</q-item-section>
                            </q-item>
                          </q-list>

                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="proposals">Proposals</div>
                          Users owning a DAO token can create proposals. It can be about anything that requires a voting from the DAO community.
                          Proposal data contains all information related to proposal such as title, description, attachments, voting period, creator's digital signature, etc.
                          If DAO is on-chain + off-chain, proposals can contain on-chain DAO treasury assets transfers, which can be proposed
                          on a blockchain to be executed by the DAO community.
                          Every proposal (JSON) is an immutable document saved in IPFS.
                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="votes">Votes</div>
                          Users owning a DAO token can vote on proposals.
                          Vote data contains information about voter, his voting power, voting time, voter's digital signature, etc.
                          Every vote is an immutable document saved in IPFS.
                          <div class="q-pa-md text-center" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="proposalSummaryReport">Proposal summary reports</div>
                          A proposal summary report is a proposal voting summary generated when the proposal voting period ends.
                          It allows to validate all the votes and obtain final proposal decision result.
                          Every proposal summary report is an immutable document saved in IPFS.<br><br>



                          <q-banner dense class="q-mt-md q-mb-xs state noisegreencard">
                            <template v-slot:avatar>
                              <q-icon name="fa-regular fa-lightbulb" color="primary" />
                            </template>
                            Every DAO, proposal, vote and proposal summary report is an immutable document saved in IPFS. Every DAO, proposal and vote
                            is cryptographically client side signed by the users. This provides a digital data seal which allows to prove validity, authenticity and ownership of every single DAO related data.
                          </q-banner>
                        </div>
                      </div>

                      <div class="row q-mt-lg">
                        <div class="col-12">
                          <div class="q-pa-lg">
                            <div class="text-center text-h1" id="whatMakesUnique">
                              What
                            </div>
                            <div class="text-overline text-center q-pb-md text-sub">makes stateborn off-chain DAO unique?</div>
                          </div>
                          Stateborn design philosophy is to <b>minimize trust in the third party as much as possible</b>.
                          The ideal scenario is to completely eliminate third party and blockchain is the solution to this problem.
                          However, usage of blockchain has a cost, and the industry has already proved that this cost
                          is incommensurate to most DAO use-cases.
                          This is why stateborn follows the off-chain governance model with the minimal role of a centralized third party. <br><br>
                          That said, here are some key stateborn features and architecture details.


                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-img src="/add.png" :style="$q.platform.is.mobile ? 'width: 50px' : 'width: 80px' "/>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="doesntAddData">
                                Stateborn backend doesn't add any data to DAOs, proposals or votes
                              </div>
                              Every single "business" data is created client side and cryptograhically client signed by the users. Backend after receiving the data from a client,
                              only validates the data before saving it to IPFS. It is possible to retrieve all the DAOs, proposals and votes related information directly from
                              blockchain and IPFS. Proposals attachments like images or PDF documents are directly encoded in IPFS document.
                            </div>
                          </div>

                          <q-separator color="grey-5" class="q-mt-md q-mb-md"></q-separator>

                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-img src="/ipfs.png" :style="$q.platform.is.mobile ? 'width: 50px' : 'width: 80px' "/>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                                Every DAO, proposal, user vote and proposal summary report is client side validated with IPFS                  </div>
                              Data returned by stateborn backend is validated with data saved in IPFS. It eliminates the possibility to rely on malformed
                              or incorrect data from the backend. In any case of stateborn backend data manipulation, user will see the validation result in <a href="https://stateborn.org" target="_blank">stateborn.org</a> interface.
                              Moreover, users have the possibility to <b>set custom IPFS gateway address in <a href="https://stateborn.org" target="_blank">stateborn.org</a> user interface</b> in order to validate the data with custom IPFS gateway.
                            </div>
                          </div>
                          <q-separator color="grey-5" class="q-mt-md q-mb-md"></q-separator>

                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-img src="/indexeddb.png" style="width:80px"/>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                                Every DAO, proposal, user vote and proposal summary report is stored in the client side database (IndexedDB)
                              </div>
                              Every DAO, proposal and user vote related data is saved to user's Internet browser database (IndexedDB). DAOs, proposals and proposal summary reports are
                              saved to client database after first fetching from backend and validation with IPFS. User votes are saved to client database
                              even before sent to backend in order to examine the possibility of stateborn backend votes censorship (not submission).
                              This enhances the process of client side validation but also provides theoretically the possibility to rebuild the DAO
                              in case of <a href="https://stateborn.org" target="_blank">stateborn.org</a> shutdown or data removal.
                            </div>
                          </div>


                          <div class="q-pt-md q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'"></div>

                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="row justify-center">
                    <div class="col-lg-12 col-xs-grow">
                      <div class="row">
                        <div class="col-12">
                          <div class="q-pa-lg">
                            <div class="text-center text-h1" id="voting">
                              Voting
                            </div>
                            <div class="text-overline text-center q-pb-md text-sub">process</div>
                          </div>

                          Voting process describes a lifecycle of decision making process from initial proposal creation to the final voting result.
                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-icon name="fa-solid fa-1" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                                User creates a proposal
                              </div>
                              Every user has the ability to create proposals and vote on them.
                              Every proposal an immutable document saved in IPFS.
                              Proposals can require a minimum amount of DAO governance tokens to own in order to create proposals. This threshold
                              is defined by the DAO creator. Stateborn backend validates the proposal requirements and validity before saving in IPFS.<br><br>
                              Proposals contain some "business" data like title, description, attachments, voting period etc. Additionally, every proposal
                              has a block number included - the latest block read from a blockchain before submitting the proposal. The block number
                              is a reference to counting user votes and is the protection to prevent votes manipulation. If a proposal was created with a block number
                              XXX and user A owned 100 governance tokens at block XXX, then user A could vote only with 100 governance tokens.
                              If user A received 1000 additional tokens in block XXX + 1, he can still vote only with 100 tokens.

                              <q-banner dense class="q-mt-xs q-mb-xs noisegreencard" >
                                <template v-slot:avatar>
                                  <q-icon name="fa-regular fa-lightbulb" color="primary" />
                                </template>
                                Every proposal previewed in <a href="https://stateborn.org" target="_blank">stateborn.org</a> interface by any user is validated with IPFS document content.
                                This allows to prove the authenticity of the proposal.
                              </q-banner>
                            </div>
                          </div>

                          <q-separator color="grey-5" class="q-mt-md q-mb-md"></q-separator>

                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-icon name="fa-solid fa-2" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                                Users vote on the proposal
                              </div>
                              Users vote on proposals. Every vote is an immutable document saved in IPFS.
                              Users voting power is the amount of tokens they own. Voting power is calculated directly on the client side and then is
                              only verified by stateborn backend services. Users can change their votes. Latest user's vote is considered to be final
                              and should be the only one counted.
                              <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
                                <template v-slot:avatar>
                                  <q-icon name="fa-regular fa-lightbulb" color="primary" />
                                </template>
                                Every user vote is saved in <a href="https://stateborn.org" target="_blank">stateborn.org</a> user interface client side database (IndexedDB) before sending to backend.
                                This can prove the attempts of votes censorship by stateborn backend.
                              </q-banner>
                              <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
                                <template v-slot:avatar>
                                  <q-icon name="fa-regular fa-lightbulb" color="primary" />
                                </template>
                                Every vote of user is client side validated with IPFS document content (fetched client side) after receiving from backend.
                                This allows to prove the authenticity of the votes.
                              </q-banner>
                            </div>
                          </div>

                          <q-separator color="grey-5" class="q-mt-md q-mb-md"></q-separator>

                          <div class="row items-center q-pt-lg">
                            <div class="col-lg-2 col-xs-grow text-center">
                              <q-icon name="fa-solid fa-3" :size="$q.platform.is.mobile ? 'md' : 'xl'"></q-icon>
                            </div>
                            <div class="col-lg-10 col-xs-grow justify-center">
                              <div class="q-pb-md" :class="$q.platform.is.mobile ? 'text-h2 text-center' : 'text-h2'" id="creation">
                                Voting period ends. <br>
                                A proposal summary report is generated.
                              </div>
                              Proposal summary report is an IPFS document describing the result of the voting process. It contains the list of users votes
                              with references to IPFS documents containing the votes. Based on the proposal summary report, the final result and voting
                              decision can be obtained.

                              Every user previewing the ended proposal in <a href="https://stateborn.org" target="_blank">stateborn.org</a> interface fetches the proposal summary report from backend and then directly from IPFS.
                              Then the proposal summary report is validated to include correct single vote of user previewing the proposal.
                              In any case of invalid vote inclusion in the proposal summary report, user will see the validation result in <a href="https://stateborn.org" target="_blank">stateborn.org</a> interface.

                              <q-banner dense class="q-mt-xs q-mb-xs noisegreencard">
                                <template v-slot:avatar>
                                  <q-icon name="fa-regular fa-lightbulb" color="primary" />
                                </template>
                                For every ended proposal previewed on <a href="https://stateborn.org" target="_blank">stateborn.org</a> interface the proposal summary report is fetched from backend.
                                Then the proposal summary report document is fetched from IPFS and is verified to include the correct single vote of user previewing the proposal.
                              </q-banner>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div class="row q-pt-lg">
                        <div class="col-12">
                          <div class="q-pa-lg">
                            <div class="text-center text-h1" id="howToCreateDao">
                              How to
                            </div>
                            <div class="text-overline text-center q-pb-md text-sub">create a DAO?</div>
                          </div>
                          Stateborn off-chain DAO creation is <b>free and available to everyone</b>.
                          There are not any requirements except governance token to be deployed on the blockchain network.
                          Stateborn supports ERC-20 and NFT governance tokens.
                          off-chain + on-chain DAO creation requires a transaction fee to be paid in order to deploy the DAO treasury smart-contract.<br><br>


                          <router-link to="/create-dao" span class="text-underline text-bold">Click here to create your custom DAO</router-link>
                        </div>
                      </div>

                      <div class="q-pa-lg">
                        <div class="text-center text-h1" id="role">
                          Role
                        </div>
                        <div class="text-overline text-center q-pb-md text-sub">of stateborn.org</div>
                      </div>
                      <div class="row justify-center">
                        <div class="col-lg-12">

                          <div class="row items-center">
                            <div class="col-lg-8 col-xs-grow justify-center">

                              <span class="text-bold"><a href="https://stateborn.org" target="_blank">stateborn.org</a> cannot steal any token, cannot change or modify any DAO, proposal or vote related data. </span><br>
                              As a centralized third party in the stateborn DAO ecosystem, <a href="https://stateborn.org" target="_blank">stateborn.org</a> application acts as an intermediary between
                              users and blockchain/IPFS.
                              Its main role is to provide user interface and backend services for operating DAOs.
                              Users saving DAO data, send them to <a href="https://stateborn.org" target="_blank">stateborn.org</a> backend services where they are validated and saved in blockchain/IPFS.
                              Since the data are cryptograhically signed by the users, <a href="https://stateborn.org" target="_blank">stateborn.org</a> backend services cannot change them.<br><br>

                              We are delighted to provide the solid and honest third party service however we believe tools should be designed to
                              eliminate and minimize the need of trust as much as possible.
                            </div>
                            <div class="col-lg-4 col-xs-grow justify-center">
                              <div class="text-center">
                                <q-img
                                  class="text-center"
                                  :style="$q.platform.is.mobile ? 'height: 200px; width:200px' : 'height: 60%; width: 60%'"
                                  src="/stateborn3.gif"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row q-pt-lg">
                        <div class="col-12">
                          <div class="q-pa-lg">
                            <div class="text-center text-h1" id="risks">
                              Risks
                            </div>
                            <div class="text-overline text-center q-pb-md text-sub">of stateborn off-chain DAOs</div>
                          </div>
                          We want to design as much trustless off-chain DAO ecosystem as possible. In the same time we want this tool to be user friendly
                          and available to big audience.<br><br>
                          The only real power <a href="https://stateborn.org" target="_blank">stateborn.org</a> has as a centralized infrastructure provider for processing DAOs data
                          is <span class="text-bold">the ability to censor the data. </span><br>
                          Since there is no technical possibility to modify the data, there is no risk of data manipulation.
                          Since data is saved in IPFS and blockchain, there is no risk of data loss or intentional removal. <br>
                          However, users can create DAOs, proposals and votes but <a href="https://stateborn.org" target="_blank">stateborn.org</a> can decide not to process them.
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

                  <div class="row justify-center q-pt-lg">
                    <div class="col-auto">
                      <q-btn  round flat @click="goToGithub()">
                        <q-avatar size="25px">
                          <img src="/brands/icons8-github-50.png">
                        </q-avatar>
                      </q-btn>
                      <q-btn  round flat @click="goToTwitter()" >
                        <q-avatar size="25px">
                          <img src="/brands/icons8-twitter-50.png">
                        </q-avatar>
                      </q-btn>
                    </div>
                  </div>
                  <div class="text-center text-subtitle2 q-pb-lg">© 2023 <a href="https://stateborn.org" target="_blank">stateborn.org</a></div>




                </div>
              </div>
            </div>
          </q-scroll-area>




        </div>
      </div>
    </q-page>
  </div>
<div></div>
</template>
<script setup lang="ts">
import PictureParallax from 'components/PictureParallax.vue';
import { goToGithub, goToTwitter } from 'src/api/services/utils-service';
import { onMounted, ref } from 'vue';
import { sleep } from 'src/api/services/sleep-service';
import { getElementOffset } from 'src/api/services/ui-utils';
import { useQuasar } from 'quasar';

const height = window.innerHeight - 75;
const scrollHeight = ref(height);
window.addEventListener('resize',function() {
  scrollHeight.value = window.innerHeight - 75;
});
const $q = useQuasar();

const barStyle = ref({
  borderRadius: '0px',
  backgroundColor: '#5B5B5B',
  width: $q.platform.is.mobile ? '2px': '5px',
  opacity: 0.2
});

const thumbStyle = ref({
  borderRadius: '0px',
  backgroundColor: '#5B5B5B',
  width: $q.platform.is.mobile ? '2px': '5px',
  opacity: 0.75
});

const items = ref(<any[]>[]);
const setItems = () => {
  items.value = [
    {
      label: 'Contents',
      scrollTo: '',
      icon: '',
      img: '',
      isLabelOnly: true,
      separatorAfter: false,
      active: true,
      topOffset: 0,
    },
    {
      label: 'About Stateborn',
      scrollTo: 'about',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('about'),
    },
    {
      label: 'Anatomy of stateborn off-chain DAO',
      scrollTo: 'anatomy',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('anatomy'),
    },
    {
      label: '• DAO definition document',
      scrollTo: 'daoDefinitionDocument',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('daoDefinitionDocument'),
    },

    {
      label: '• Governance token',
      scrollTo: 'governanceToken',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('governanceToken'),
    },
    {
      label: '• Proposals',
      scrollTo: 'proposals',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('proposals'),
    },
    {
      label: '• Votes',
      scrollTo: 'votes',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('votes'),
    },
    {
      label: '• Proposal summary report',
      scrollTo: 'proposalSummaryReport',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: false,
      active: true,
      topOffset: getElementOffset('proposalSummaryReport'),
    },
    {
      label: 'What makes stateborn off-chain DAO unique?',
      scrollTo: 'whatMakesUnique',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('whatMakesUnique'),
    },
    {
      label: 'Voting process',
      scrollTo: 'voting',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('voting'),
    },
    {
      label: 'How to create a DAO?',
      scrollTo: 'howToCreateDao',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('howToCreateDao'),
    },
    {
      label: 'Role of stateborn.org',
      scrollTo: 'role',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('role'),
    },
    {
      label: 'Risk of stateborn off-chain DAOs',
      scrollTo: 'risks',
      icon: '',
      img: '',
      isLabelOnly: false,
      separatorAfter: true,
      active: true,
      topOffset: getElementOffset('risks'),
    },

  ];
};
setItems();
onMounted(async () => {
  await sleep(200);
  setItems();
  onScroll({verticalPosition: 0});
});
const scrollAreaRef = ref(null);
const position = ref(300);
const scrollToElement = (el: any) => {
  const ele = document.getElementById(el);
  // @ts-ignore
  const offset = ele.offsetTop - ele.scrollHeight + 58;
  // @ts-ignore
  scrollAreaRef.value.setScrollPosition('vertical', offset, 500);
  position.value = Math.floor(Math.random() * 1001) * 20;
};

const onScroll = (val: any) => {
  if (scrollAreaRef.value) {
    if (scrollAreaRef.value.getScrollPercentage().top === 1) {
      for (let i = 0; i < items.value.length; i++) {
        items.value[i].active = false;
      }
      items.value[items.value.length - 1].active = true;
    } else {
      const verticalPosition: number = val.verticalPosition;
      let index = 0;
      for (let i = 0; i < items.value.length; i++) {
        const item = items.value[i];
        if (item.topOffset !== 0) {
          if (item.topOffset <= verticalPosition) {
            index = i;
          } else {
            break;
          }
        }
      }
      for (let i = 0; i < items.value.length; i++) {
        items.value[i].active = i === index;
      }
    }
  }
}
</script>
