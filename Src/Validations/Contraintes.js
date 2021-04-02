export const constraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: "^S'il vous plait entrez une addresse mail"
      },
      email: {
        message: "^S'il vous plait entrez une addresse mail valide"
      }
    },

    /*password: {
        presence: {
          allowEmpty: false,
          message: "^S'il vous plait entrez votre mot de passe"
        },
        password: {
          message: "^S'il vous plait entrez un mot de passe valide"
        }
      },

    Confcode: {
        presence: {
          allowEmpty: false,
          message: "^S'il vous plait entrez votre mot de passe"
        },
        confcode: {
          message: "^S'il vous plait entrez un mot de passe valide"
        }
      },


    Telephone: {
        presence: {
          allowEmpty: false,
          message: "^S'il vous plait entrez votre numero de telephone passe"
        },
        telephone: {
          message: "^S'il vous plait entrez un numero de telephone valide"
        }
      },*/

  };
  
  export default constraints;