import React, { useContext, useState } from "react";
import ModalContext from "../../context/modal/modalContext";
import UsercoinsContext from "../../context/usercoins/usercoinsContext";
import AllcoinsContext from "../../context/allcoins/allcoinsContext";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "react-autocomplete";
import styles from "./CoinForm.module.css";

const CoinForm = (props) => {
  const modalContext = useContext(ModalContext);
  const usercoinsContext = useContext(UsercoinsContext);
  const allcoinsContext = useContext(AllcoinsContext);

  const { hideModal, setEdit, current, addmode, setAdd } = modalContext;
  const { editCoin, userCoins, addCoin } = usercoinsContext;
  const { coins } = allcoinsContext;

  const [value, setValue] = useState("");

  const onSubmit = () => {
    const coin = {};
    coin.name = value;
    const checkCoin = coins.data.find((coin) => coin.id === value);
    if (checkCoin) {
      if (addmode) {
        addCoin(userCoins._id, coin);
        setAdd(false);
      } else {
        editCoin(userCoins._id, current, coin);
      }
    } else {
      alert("Please enter a valid coin");
    }
    hideModal();
    setEdit(false);
  };

  const closeForm = () => {
    hideModal();
    setEdit(false);
    if (addmode) {
      setAdd(false);
    }
  };

  return (
    <div className={styles.CoinForm}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginTop: 0,
        }}
      >
        <CloseIcon className={styles.closeIcon} onClick={() => closeForm()} />
        <p className={styles.title}>{addmode ? "Add New Coin" : "Edit Coin"}</p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          onSubmit={onSubmit}
        >
          {coins.data.length > 0 && (
            <Autocomplete
              inputProps={{
                placeholder: "Search by name",
              }}
              items={coins.data}
              shouldItemRender={(item, id) =>
                item.id.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              getItemValue={(item) => item.id}
              menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: "2px 0",
                fontSize: "90%",
                position: "fixed",
                overflow: "auto",
                maxHeight: "20%",
              }}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent",
                  }}
                >
                  {item.id}
                </div>
              )}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSelect={(value) => setValue(value)}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className={styles.btnGray}
              type="submit"
              value={addmode ? "Add Coin" : "Update Coin"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoinForm;
