import React from "react";
import ScrollabeFeed from "react-scrollable-feed";
import { ChatState } from "../../context/ChatProvider";
import { isSameSender, isSender } from "../../utils/util";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollabeFeed>
      {messages &&
        messages.map((item, ind) => {
          let isLoggedInSender = isSender(user._id, item.sender._id);
          let isSame = isSameSender(messages, item, ind, user._id);
          return (
            <div
            key={item._id}
            style={{display:"flex" , justifyContent:isLoggedInSender?"flex-end":"normal", alignItems:"center"}}
            >
              {( isSameSender(messages, item, ind, user._id) ||
                !isLoggedInSender) && (
                <Tooltip
                  label={item.sender.username}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar src={item.sender.pic} size={"sm"} />
                </Tooltip>
              )}
              <span style={{marginTop:"2px", backgroundColor: isLoggedInSender ? "#BEE3F8" : "#B9F5D0", borderRadius:"20px", padding:"5px 15px", maxwidth:"75%", marginLeft:"5px"
            }}>{item.content}</span>
            </div>
          );
        })}
    </ScrollabeFeed>
  );
};

export default ScrollableChat;
