import Link from 'next/link';
import React from 'react';
import { Routes } from '../types/routes';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link href={Routes.HOME} className={styles.logo}>
      <svg
        width="246"
        height="70"
        viewBox="0 0 1230 356"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M239.63 139.903C246.171 134.4 251.943 129.682 257.331 124.965C264.642 118.282 272.723 117.102 281.958 119.854C286.191 121.427 288.884 124.965 289.654 130.075C291.578 152.09 283.497 168.601 268.49 183.147C265.796 185.505 263.872 188.257 261.179 190.616C257.331 193.761 258.1 195.726 261.948 198.085C274.262 206.341 283.882 216.955 290.808 230.321C297.35 243.294 298.889 256.66 298.504 271.205C298.12 286.144 291.193 297.937 282.727 308.159C272.338 319.952 258.87 328.601 245.402 336.463C221.544 350.222 195.762 354.154 168.826 354.154C168.056 354.154 167.287 354.154 166.517 354.154C155.358 357.692 144.199 355.333 133.809 353.76C124.959 352.581 115.723 351.009 106.873 349.436C91.8657 347.077 77.628 341.574 63.3904 336.856C54.9247 333.711 46.8439 329.387 39.5327 323.49C32.991 318.38 24.9102 316.021 19.1381 308.945C9.5181 297.151 2.59167 283.785 0.282854 268.453C-0.486749 262.557 0.282854 255.874 2.97647 250.763C8.7485 240.149 7.20929 229.535 5.28528 218.527C4.51568 214.989 3.74607 211.844 2.97647 208.306C1.43726 199.658 6.43968 194.547 12.2117 189.83C15.6749 187.078 18.7533 184.326 21.8318 181.181C30.2974 172.532 40.3023 170.567 51.8463 172.532C56.4639 173.319 61.4664 172.925 66.084 174.891C69.932 176.464 71.0864 181.574 73.3952 181.967C76.4736 182.36 79.9369 178.036 83.7849 179.215C88.0177 180.788 88.0177 178.822 87.2481 176.07C83.4001 162.311 80.7065 148.159 78.3976 134.007C76.8584 125.751 76.0888 117.102 75.704 108.454C75.704 104.916 78.3976 101.771 80.7065 99.4121C85.7089 93.9084 91.4809 89.191 98.4073 86.4391C101.486 85.2598 104.564 84.0804 107.643 82.5079C112.26 80.1492 118.417 78.9699 121.111 75.0387C123.804 71.1075 119.187 65.6038 118.032 60.4932C116.493 54.2033 119.571 49.0928 121.111 43.5891C122.265 38.8717 124.189 34.5473 127.267 31.0093C132.27 25.1125 134.579 18.0363 136.888 10.9602C137.657 8.99457 137.657 7.02898 139.966 7.02898C142.66 7.02898 143.044 9.3877 143.814 11.3533C145.738 16.0707 145.353 21.1813 143.814 25.8987C141.89 32.5817 140.351 39.2648 138.042 45.5547C135.733 53.4171 136.888 61.6726 137.272 69.9281C137.272 71.8937 137.657 74.2524 140.351 73.0731C143.044 71.8937 147.662 74.2524 147.662 69.535C147.277 57.3483 154.973 48.6996 159.591 38.4785C163.054 31.0093 166.132 23.1469 167.287 14.8914C167.672 12.1395 168.057 9.78081 166.132 7.02898C164.593 5.06338 164.593 1.5253 167.287 0.345945C169.981 -0.833413 172.674 1.13218 174.213 4.27714C177.677 12.5327 177.292 21.1813 176.522 29.4368C175.753 36.5129 173.059 42.8029 169.981 48.6996C166.902 54.2033 166.517 60.4932 164.593 66.39C163.439 69.9281 164.978 71.5006 169.211 71.5006C179.985 71.5006 179.601 71.5006 184.603 62.0657C192.299 46.3409 195.377 29.8299 195.762 12.5327C195.762 10.5671 194.993 7.81522 198.071 7.4221C200.765 7.02898 202.304 8.99458 203.073 11.3533C207.691 26.2918 208.846 40.8373 200.765 54.5964C198.071 58.9208 196.147 63.6382 194.223 68.7487C193.069 72.6799 194.223 73.0731 197.301 73.8593C204.997 76.218 213.463 75.8249 221.159 79.7561C225.777 82.1148 230.01 84.8666 235.012 86.4391C236.936 86.8322 238.09 88.7978 239.245 90.7634C243.478 97.4465 246.941 103.736 243.093 112.778C239.63 120.641 240.399 129.682 239.63 139.903ZM26.8342 244.08C31.8366 250.37 37.6086 256.267 44.1503 260.984C51.0767 265.702 57.6183 270.026 64.16 275.137C70.3168 279.854 76.8584 284.571 83.4001 289.289C84.1697 280.247 83.7849 280.247 78.0128 275.137C70.3168 268.453 61.4664 263.343 54.1551 255.874C43.7655 245.259 31.4518 236.611 19.9078 227.176C17.5989 225.21 16.0597 222.459 12.5965 222.065C12.5965 233.073 17.2141 240.149 26.8342 244.08ZM9.5181 260.984C7.59409 264.915 7.20929 268.453 7.59409 271.992C9.5181 288.503 20.2926 299.51 31.8366 308.945C48.7679 322.704 68.3928 331.353 89.5569 338.036C114.569 345.898 139.966 348.65 165.363 348.65C179.601 348.65 194.223 347.077 208.461 342.753C236.166 334.498 261.179 322.704 280.034 299.117C293.887 281.426 295.041 262.557 288.115 242.508C286.96 239.363 287.73 235.825 285.806 232.68C278.879 219.314 268.49 209.092 255.791 201.23C253.867 200.051 250.019 198.871 247.71 202.016C243.478 208.306 238.475 213.81 233.858 219.707C230.394 224.031 226.931 229.142 225.007 234.645C221.929 244.473 220.005 254.694 218.466 264.915C218.081 266.488 217.311 267.667 215.772 268.06C206.922 270.419 199.61 276.316 190.375 278.281C170.365 282.213 150.356 281.033 130.346 277.888C122.65 276.709 114.184 273.957 111.106 265.309C103.025 241.721 96.4833 217.348 90.7113 192.975C89.9417 189.83 89.9417 186.291 87.2481 184.326C84.9393 182.753 82.6305 186.292 80.3217 186.685C79.5521 187.078 78.7824 187.078 78.0128 187.078C74.5496 187.471 73.78 189.436 74.5496 192.581C76.4736 198.871 78.7824 204.768 79.5521 211.058C80.7065 220.886 82.2457 230.321 84.9393 239.756C91.8657 262.95 92.2505 287.323 94.5593 311.303C94.9441 316.807 93.0201 317.987 87.6329 316.021C76.4736 311.697 66.8536 304.227 56.8487 297.937C40.6871 287.323 24.5254 275.53 9.5181 260.984ZM91.4809 167.422C93.4049 185.898 99.9466 202.409 103.025 219.314C103.025 220.493 104.179 221.672 105.719 220.493C108.027 218.92 110.721 217.348 112.26 214.989C117.647 207.913 122.265 207.913 128.037 214.989C133.809 222.458 140.351 222.852 147.277 216.169C148.816 214.596 149.971 213.024 151.51 211.844C158.436 205.554 162.284 206.341 167.287 213.81C169.981 217.741 173.059 218.92 176.907 216.169C178.831 214.989 180.37 213.417 182.294 211.844C185.757 209.092 190.375 205.554 194.223 206.341C201.919 208.699 208.076 205.554 214.233 202.803C215.772 202.016 218.466 200.051 219.62 202.409C220.774 204.768 217.696 205.161 216.542 205.947C215.387 206.734 214.233 207.52 215.387 208.699C216.157 209.486 216.542 211.844 217.696 210.665C219.62 208.699 223.468 209.879 224.238 205.161C225.392 195.333 227.316 185.505 228.855 175.677C230.01 167.815 230.01 160.346 232.703 151.697C228.086 153.269 221.159 154.056 221.544 156.414C221.929 162.311 216.542 163.884 215.002 164.67C208.845 168.208 201.919 168.994 194.993 165.849C199.225 160.739 206.921 165.849 211.154 159.559C210 159.559 208.846 159.559 208.076 159.559C206.922 159.559 205.382 161.525 204.997 158.773C204.613 156.414 206.922 157.201 208.076 156.808C209.615 156.414 211.539 157.594 212.309 155.628C207.691 149.731 202.304 151.304 197.301 154.842C189.221 160.346 180.755 163.097 171.905 156.808C163.824 151.304 162.284 151.304 154.204 157.594C152.664 158.773 151.125 159.952 149.586 160.739C141.505 165.849 133.424 165.063 126.498 158.773C123.419 156.021 120.341 155.628 117.263 158.38C115.339 159.952 113.415 161.918 111.491 163.097C104.564 167.422 99.177 172.925 91.4809 167.422ZM220.774 216.955C215.002 220.1 209.23 223.638 202.304 220.886C201.149 220.493 199.225 220.1 198.841 222.458C198.456 224.817 196.917 225.21 195.377 224.031C194.223 222.852 194.608 221.279 195.762 220.1C198.841 218.134 198.456 216.169 196.147 213.417C193.838 210.665 191.914 211.451 189.221 212.631C186.142 214.596 183.064 216.562 180.37 219.314C174.213 224.817 168.056 224.424 163.054 217.741C158.052 211.451 158.052 211.451 153.049 217.348C143.044 228.355 133.04 228.748 123.804 218.134C121.495 215.382 118.802 214.989 116.108 216.169C109.567 218.527 105.334 228.355 107.258 235.038C109.182 241.328 111.491 247.618 113.03 253.908C116.878 266.488 124.959 272.778 137.272 273.564C157.282 275.137 176.907 275.53 196.532 269.24C211.154 264.522 217.311 249.191 216.157 236.218C209.23 240.149 203.843 246.439 195.762 248.797C193.069 249.584 190.375 251.156 188.451 253.122C184.988 257.446 181.525 258.625 174.598 254.301C181.909 255.481 186.142 250.763 190.76 248.011C199.225 242.901 207.691 238.183 216.157 233.466C217.696 232.68 218.85 231.893 219.235 229.928C220.005 225.603 221.929 221.672 220.774 216.955ZM148.432 124.572C163.054 124.179 177.292 122.606 191.145 119.461C204.613 116.316 218.466 113.564 231.164 106.881C233.858 105.309 236.166 103.736 236.166 100.198C236.166 97.0534 234.242 95.0878 231.549 93.5153C221.544 88.0116 211.924 82.901 200.38 80.9355C190.76 79.363 190.76 78.5767 190.76 88.7978C190.76 89.191 190.76 89.5841 190.76 89.9772C190.76 92.3359 191.145 94.6946 187.297 95.4809C183.833 96.2671 182.294 94.6946 181.525 91.9428C180.755 89.5841 179.601 87.6185 179.601 85.2598C180.37 77.7905 177.292 76.218 170.75 77.3974C169.596 77.7905 168.441 77.3974 166.902 77.3974C164.208 77.0043 162.669 78.1836 163.054 81.3286C163.824 85.2598 161.9 89.191 161.9 93.1222C161.515 95.4809 159.206 97.0534 158.436 95.4809C155.743 91.1566 148.432 90.3703 149.201 83.2942C149.201 81.7217 149.201 78.5767 145.353 78.5767C138.427 78.5767 133.424 84.4735 134.964 91.5497C135.733 94.6946 136.888 97.8396 133.809 99.019C130.731 100.198 129.576 95.874 127.652 93.9084C127.267 93.5153 127.267 92.729 127.267 92.3359C126.883 84.8666 123.035 84.8666 117.647 87.2254C116.878 87.6185 115.723 87.2254 114.569 87.6185C103.41 91.9428 91.8657 96.6602 84.1697 106.881C80.3216 111.992 82.2457 116.709 88.4025 117.889C108.412 122.606 128.807 123.785 148.432 124.572ZM83.0153 122.606C82.6305 130.469 85.3241 137.152 85.7089 144.228C86.0937 152.09 89.9417 158.38 96.0985 163.491C98.0225 165.063 99.1769 165.063 101.486 163.884C106.103 161.132 110.721 157.594 114.954 154.449C119.187 151.304 127.267 152.09 129.961 156.414C132.27 160.346 135.348 160.346 138.812 159.559C143.814 158.773 148.047 155.628 151.895 152.876C160.745 146.586 164.978 146.193 173.829 152.483C178.831 156.021 183.449 157.987 189.221 154.056C191.914 152.09 194.608 150.125 197.301 148.552C200.765 146.193 205.382 144.228 208.846 146.586C215.772 151.304 221.544 148.552 228.47 146.98C235.782 145.014 234.242 140.297 234.242 135.972C234.242 134.007 235.012 131.648 233.088 130.075C230.01 128.11 230.01 128.11 233.858 125.751C235.397 124.965 235.012 123.785 235.012 122.606C235.012 121.034 234.242 121.427 233.088 121.427C223.853 122.999 215.387 127.717 206.152 129.289C201.919 130.075 198.071 130.075 194.608 126.144C193.838 124.965 192.684 125.358 191.914 125.751C190.375 126.537 188.451 126.537 186.527 126.93C168.056 129.289 149.201 130.075 130.346 129.682C113.799 129.682 98.4073 126.537 83.0153 122.606ZM39.1478 233.466C54.5399 246.439 66.8536 261.77 84.9393 270.419C83.7849 257.446 81.4761 245.259 78.3976 233.073C74.9344 218.134 71.0864 203.196 67.6232 188.257C67.2384 186.685 66.084 185.505 64.5448 185.898C61.4664 187.078 58.3879 187.078 55.3095 187.078C53.0007 187.078 52.6159 189.043 52.6159 190.616C52.6159 192.188 51.8463 194.154 53.3855 195.333C54.9247 196.513 55.6943 194.154 56.8487 193.368C61.0816 190.616 63.3904 192.581 63.7752 196.906C64.16 202.016 65.6992 207.127 66.4688 212.237C67.6232 219.314 59.9272 230.321 53.3855 231.107C49.1527 232.68 44.9199 233.073 39.1478 233.466ZM16.0597 246.046C14.5205 255.481 16.8293 262.557 25.295 266.881C26.0646 267.274 26.8342 268.06 27.6038 268.847C44.1503 284.178 63.0056 296.758 82.6305 307.765C86.8633 310.124 88.0177 309.338 87.6329 304.62C87.6329 302.262 86.8633 299.903 84.9393 298.724C78.0128 293.613 71.0864 288.896 64.5448 283.785C61.4664 281.033 60.6968 286.144 58.3879 284.964C53.7703 283.392 61.0816 280.247 57.6183 278.675C54.1551 277.102 52.6159 271.598 47.2287 275.137C45.6895 276.316 44.5351 273.957 44.1503 272.385C43.7655 265.308 37.6086 264.915 33.7606 260.984C32.6062 263.736 35.6846 265.702 33.3758 267.667C29.5278 265.702 27.219 263.343 28.3734 258.625C28.7582 257.446 28.7582 257.053 27.6038 256.267C24.1406 252.729 20.2926 249.191 16.0597 246.046ZM231.164 200.444C244.247 187.078 255.407 173.319 265.411 158.773C267.72 155.235 269.644 151.697 270.029 147.373C270.029 145.407 270.029 143.835 268.105 142.262C266.181 140.69 264.642 141.869 263.103 143.048C260.409 145.407 257.715 148.159 254.637 150.518C248.865 155.235 244.632 161.918 238.86 166.242C234.627 168.994 233.858 172.532 233.858 176.07C233.473 183.933 232.318 191.795 231.164 200.444ZM237.321 158.773C240.014 158.38 240.399 156.021 241.554 154.449C246.556 147.766 252.328 141.869 259.255 137.152C263.487 134.007 268.105 134.4 272.723 135.972C276.571 137.152 276.955 141.083 276.571 144.621C275.416 153.663 271.953 162.311 266.951 169.78C258.1 182.36 246.556 192.581 236.936 204.375C233.858 207.913 230.779 211.451 228.47 215.775C227.701 217.348 226.931 219.314 228.47 220.493C230.01 221.672 231.164 219.707 231.934 218.92C235.012 216.169 236.936 212.237 239.245 209.092C243.478 202.409 248.48 196.513 254.252 191.009C258.87 186.685 263.487 182.753 267.72 178.429C272.338 173.319 273.107 166.242 276.955 161.918C283.497 154.449 282.727 145.8 282.727 137.152C282.727 128.11 275.031 124.179 267.72 128.503C259.255 133.613 250.789 139.117 244.632 146.586C241.169 149.731 236.551 152.876 237.321 158.773ZM139.196 22.3606C135.348 32.1886 126.883 39.2648 124.574 49.879C121.88 61.2795 128.422 70.3212 130.346 80.5423C134.194 70.7143 128.807 60.4932 131.116 50.6652C133.424 41.6235 137.272 32.1886 139.196 22.3606ZM58.0031 181.181C54.5399 180.002 52.2311 180.788 50.3071 179.608C43.7655 175.677 36.839 178.036 31.8366 180.788C24.5254 185.112 18.7533 191.795 12.5965 197.692C11.0573 198.871 8.7485 201.623 11.0573 203.589C12.5965 204.768 14.9053 202.409 16.0597 201.23C21.0622 193.761 27.9886 190.223 36.0694 187.078C42.2263 183.54 49.1527 181.967 58.0031 181.181ZM25.6798 222.852C26.8342 218.92 27.9886 215.382 27.219 211.058C26.4494 206.734 26.4494 202.016 31.4518 199.658C32.991 198.871 34.915 197.692 33.7606 196.119C32.6062 194.547 30.2974 194.547 28.7582 196.119C23.7558 201.23 17.5989 205.554 14.5205 211.844C13.3661 214.596 21.0622 218.527 24.5254 222.458C24.5254 222.852 24.9102 222.852 25.6798 222.852ZM171.135 30.6161C170.75 30.223 169.981 30.223 169.596 29.8299C164.978 39.6579 159.976 49.0928 155.743 58.9208C151.895 67.5694 152.664 76.6111 156.897 85.2598C156.128 65.6038 164.208 48.3065 171.135 30.6161ZM40.3023 226.783C48.7679 227.569 54.5399 225.997 58.0031 219.314C58.7727 217.741 59.9272 215.775 58.3879 214.203C56.8487 212.631 55.3095 214.203 54.1551 215.382C48.7679 218.92 42.6111 220.493 36.4542 219.707C34.1454 219.314 32.6062 219.707 32.2214 222.065C31.8366 224.817 33.3758 226.39 35.2998 226.783C37.6086 227.176 39.9175 226.783 40.3023 226.783ZM184.603 86.046C186.912 75.0387 189.99 64.4244 194.993 54.5964C198.841 46.7341 203.073 37.6923 199.225 28.2574C199.61 39.2648 196.147 49.4859 190.76 58.9208C186.912 65.6038 184.988 73.0731 183.064 80.5423C182.679 82.1148 182.679 84.0804 184.603 86.046ZM235.782 113.171C224.622 117.889 212.309 120.247 201.149 125.751C213.848 125.751 225.392 120.641 235.782 113.171ZM55.6943 203.196C52.6159 204.375 49.5375 205.947 46.4591 206.341C42.9959 207.127 39.5327 207.127 36.0694 207.913C34.915 208.306 32.6062 205.554 32.2214 208.699C31.8366 211.058 34.1454 211.844 35.6846 212.631C41.8415 214.989 52.6159 210.272 55.6943 203.196ZM40.3023 196.119C40.3023 198.085 39.5327 200.051 42.2263 200.444C44.5351 200.444 46.0743 198.871 46.4591 196.906C46.8439 194.547 45.3047 192.581 43.3807 192.188C41.0719 191.402 40.6871 194.154 40.3023 196.119Z"
          fill="currentColor"
        />
        <path
          d="M216.926 330.566C210.77 330.566 204.997 329.387 198.841 330.566C191.529 331.746 186.142 326.242 179.985 323.883C178.831 323.49 177.677 321.918 176.907 322.311C166.517 323.883 159.976 319.166 156.128 309.731C155.743 308.945 155.743 308.159 154.588 308.552C149.586 310.124 147.662 306.193 146.508 302.655C145.353 298.724 144.584 294.792 148.047 290.861C151.125 287.323 153.434 283.785 158.436 282.999C159.591 282.999 160.36 282.213 161.13 282.999C166.132 287.323 172.674 284.964 178.061 286.144C188.836 289.289 198.841 283.392 209.23 284.964C211.924 285.358 212.694 282.999 214.618 282.213C222.698 278.675 229.24 273.564 234.627 266.488C236.166 264.522 237.321 262.95 238.09 260.591C239.245 254.694 242.323 250.37 247.71 247.618C250.404 246.439 250.789 244.08 251.559 241.328C252.713 237.004 255.022 233.073 260.409 233.073C265.027 233.466 269.259 238.183 268.875 243.687C268.49 249.191 268.875 254.301 270.414 259.805C271.568 264.129 268.875 269.633 266.566 273.957C264.642 277.495 264.257 280.247 264.642 283.392C265.411 290.861 262.333 296.365 256.946 301.082C253.867 303.834 251.174 306.979 249.635 310.91C243.478 325.063 231.549 330.566 216.926 330.566ZM217.696 325.456C225.777 326.242 233.088 322.311 239.245 316.414C242.323 313.269 244.632 309.731 243.862 305.014C242.323 297.151 237.706 290.075 233.858 282.999C232.703 280.64 231.164 279.068 228.47 281.426C224.238 284.571 220.005 287.716 215.002 290.468C213.078 291.648 212.309 294.006 212.309 296.365C213.078 303.834 210.77 310.91 210.385 317.987C210 325.456 209.615 325.456 217.696 325.456ZM206.152 300.296C205.767 291.254 204.997 290.468 198.071 292.041C196.147 292.434 193.838 292.434 191.914 293.22C189.605 294.006 186.912 294.006 186.142 297.151C184.988 302.262 183.449 307.372 181.909 312.876C181.14 315.628 181.14 318.773 183.833 320.345C187.681 322.704 191.914 325.063 196.917 325.063C200.765 325.063 203.073 323.883 203.458 319.559C204.613 312.09 205.767 305.407 206.152 300.296ZM258.1 286.144C258.1 276.709 247.326 266.881 241.169 268.453C238.09 269.24 235.397 272.385 236.936 274.35C242.323 281.426 243.862 290.075 248.865 297.544C250.019 299.51 251.174 299.51 252.328 297.544C254.637 293.22 258.1 288.896 258.1 286.144ZM181.14 294.399C181.14 292.827 180.755 291.647 178.831 291.647C175.753 291.647 172.289 291.648 170.75 294.792C168.826 298.724 166.517 301.869 163.439 304.62C161.13 306.193 161.13 308.945 161.9 311.303C163.439 315.235 167.672 315.628 171.135 316.414C173.059 316.807 175.368 316.021 176.137 313.662C177.677 306.979 179.601 300.689 181.14 294.399ZM252.713 253.515C248.095 252.729 245.402 255.874 244.632 259.805C243.478 264.129 248.095 263.736 250.019 264.915C252.328 266.095 255.407 266.881 257.715 268.847C260.024 270.812 261.179 270.026 262.333 267.274C265.411 259.805 261.563 253.908 252.713 253.515ZM164.978 294.399C159.976 295.186 162.669 288.503 158.436 288.896C153.819 289.289 151.51 293.613 151.125 297.544C150.74 299.117 151.125 303.048 154.973 302.262C158.821 301.869 162.284 299.903 164.978 294.399ZM263.103 243.294C262.333 241.721 261.179 239.756 259.255 240.149C256.946 240.542 256.946 242.508 256.946 244.473C256.946 246.439 257.715 247.618 260.024 247.225C261.948 246.832 262.333 245.259 263.103 243.294Z"
          fill="currentColor"
        />
        <path
          d="M216.926 172.532C213.078 172.139 210.769 175.677 207.306 176.07C211.539 177.25 215.387 176.857 218.466 173.319C219.62 171.746 221.929 171.353 223.083 173.319C224.622 175.677 222.698 176.857 221.159 177.643C217.311 179.215 214.233 181.967 208.845 180.002C206.152 178.822 201.534 181.574 198.071 182.753C196.532 183.147 194.993 183.54 193.069 182.753C194.608 178.036 199.61 180.395 202.304 178.429C203.073 177.643 205.767 178.822 204.997 176.463C204.613 174.498 203.073 174.498 201.149 175.284C198.456 176.463 195.762 177.643 193.069 177.25C191.914 177.25 191.145 176.463 191.145 175.284C191.145 174.891 192.299 174.105 193.069 174.105C196.532 173.319 200.38 172.532 203.843 171.746C204.613 171.746 206.152 171.746 206.152 171.746C206.537 177.25 208.461 173.319 210 172.532C211.924 170.174 214.233 167.815 216.926 172.532Z"
          fill="currentColor"
        />
        <path
          d="M209.615 191.795C210.769 194.547 215.772 191.402 215.002 195.333C214.233 198.085 210.769 198.085 208.076 198.085C205.382 198.085 202.304 195.726 201.919 194.547C201.149 191.795 204.613 191.402 206.537 190.616C212.693 189.043 217.696 184.719 225.392 185.505C220.774 190.616 213.848 187.864 209.615 191.795Z"
          fill="currentColor"
        />
        <path
          d="M210.385 182.753C206.152 188.65 201.149 190.616 195.377 189.043C199.225 184.326 205.767 186.292 210.385 182.753Z"
          fill="currentColor"
        />
        <path
          d="M196.917 257.446C201.149 253.122 208.076 256.267 211.924 251.156C213.078 253.122 212.309 254.694 211.154 255.481C204.613 259.412 199.225 266.095 190.76 266.095C187.681 266.095 185.373 269.24 182.294 269.24C181.525 269.24 180.37 270.419 179.985 268.847C179.601 268.06 179.601 266.881 179.985 265.702C180.37 264.129 182.294 264.522 183.064 264.915C185.757 265.309 199.225 261.377 199.995 259.412C201.149 255.481 197.301 259.412 196.917 257.446Z"
          fill="currentColor"
        />
        <path
          d="M215.002 225.997C214.233 228.355 212.309 228.748 210.77 229.142C203.458 230.714 196.917 233.466 191.529 238.969C189.99 240.149 188.066 240.149 187.297 238.969C186.142 237.004 187.681 236.218 189.221 235.431C196.532 231.893 203.458 227.569 211.154 224.817C212.309 224.424 214.233 223.638 215.002 225.997Z"
          fill="currentColor"
        />
        <path
          d="M223.468 132.041C222.698 135.579 220.005 134.007 219.235 135.972C220.774 137.152 222.314 136.758 223.853 136.758C225.392 136.365 226.931 135.579 227.316 137.545C228.086 139.903 225.777 140.296 224.238 140.296C215.772 141.869 207.306 143.048 198.456 144.621C199.225 140.296 201.919 139.903 204.613 139.51C207.306 139.117 210.385 141.476 213.848 138.331C208.846 136.758 204.613 137.152 200.38 138.331C199.225 138.724 197.686 139.117 197.686 137.152C197.686 135.579 198.841 134.793 199.995 135.186C208.076 137.545 215.387 134.007 223.468 132.041Z"
          fill="currentColor"
        />
        <path
          d="M26.8342 244.08C27.9886 242.508 26.0646 239.756 28.3734 238.576C29.5278 238.183 31.067 238.183 31.8366 239.363C32.991 241.328 36.0694 242.901 33.7606 245.653C30.6822 249.191 28.7582 245.653 26.8342 244.08Z"
          fill="currentColor"
        />
        <path
          d="M463.974 267.949V263.572C461.62 257.577 459.64 252.335 458.034 247.845L451.6 229.86C449.423 223.797 447.443 219.432 445.661 216.766C443.901 214.099 441.823 212.138 439.425 210.885C437.049 209.631 433.838 209.004 429.79 209.004H419.298V245.793C419.298 252.905 419.913 257.384 421.145 259.23C422.377 261.076 425.083 262.524 429.262 263.572V267.949H393V263.572C396.893 262.638 399.555 261.361 400.985 259.743C402.415 258.147 403.13 253.497 403.13 245.793V168.762C403.13 160.944 402.393 156.226 400.919 154.608C399.423 153.012 396.783 151.736 393 150.778V146.436H429.262V150.778C425.413 151.804 422.795 153.126 421.409 154.744C420.001 156.385 419.298 161.058 419.298 168.762V201.346H429.592C434.234 201.346 437.885 199.91 440.547 197.038C443.208 194.166 446.607 186.792 450.742 174.917C454.526 163.702 458.287 155.907 462.027 151.53C465.788 147.177 471.904 145 480.372 145C483.078 145 486.631 145.65 491.03 146.949V167.429H482.517C481.835 161.548 479.35 158.608 475.06 158.608C472.42 158.608 470.155 159.884 468.263 162.437C466.371 164.99 463.765 170.631 460.443 179.361C457.803 186.496 455.516 191.738 453.58 195.089C451.622 198.44 448.961 201.209 445.595 203.397V204.115C454.988 207.078 462.225 214.463 467.306 226.27L475.06 244.357C477.92 251.059 480.526 255.788 482.88 258.546C485.234 261.304 488.753 262.98 493.439 263.572V267.949H463.974ZM533.462 245.417C533.462 248.927 533.649 251.72 534.023 253.794C534.397 255.868 534.969 257.509 535.739 258.717C536.531 259.948 537.587 260.905 538.907 261.589C540.204 262.273 542.261 262.934 545.077 263.572V267.949H507.363V263.572C510.904 262.638 513.28 261.589 514.49 260.427C515.7 259.264 516.492 257.612 516.866 255.469C517.24 253.349 517.426 250.09 517.426 245.691V168.694C517.426 164.591 517.284 161.605 516.998 159.736C516.69 157.867 516.217 156.408 515.579 155.36C514.919 154.334 514.039 153.502 512.939 152.864C511.861 152.248 510.002 151.553 507.363 150.778V146.436H549.96C563.378 146.436 573.365 149.091 579.92 154.402C586.475 159.713 589.753 167.794 589.753 178.643C589.753 184.82 588.719 190.371 586.651 195.294C584.606 200.217 581.691 204.252 577.907 207.397C574.124 210.543 569.648 212.8 564.478 214.167C559.331 215.535 553.92 216.219 548.244 216.219C541.887 216.219 536.96 216.105 533.462 215.877V245.417ZM533.462 208.492H543.46C549.927 208.492 555.261 207.614 559.463 205.859C563.686 204.104 566.909 201.198 569.131 197.14C571.374 193.06 572.496 187.67 572.496 180.968C572.496 175.863 571.836 171.6 570.516 168.181C569.197 164.785 567.371 162.038 565.039 159.941C562.729 157.867 559.969 156.408 556.757 155.565C553.546 154.699 550.048 154.266 546.265 154.266C540.611 154.266 536.344 154.38 533.462 154.608V208.492ZM701.443 150.778C698.517 151.736 695.988 153.491 693.854 156.044C691.698 158.596 688.443 164.705 684.087 174.37L659.704 228.698C652.313 245.132 645.933 256.119 640.566 261.658C635.221 267.219 628.732 270 621.099 270C616.479 270 612.157 269.316 608.131 267.949V245.246H617.403C617.931 252.13 620.747 255.572 625.85 255.572C632.669 255.572 638.971 249.816 644.757 238.306L616.809 174.917C612.454 165.001 609.374 158.767 607.571 156.214C605.767 153.662 603.259 151.849 600.048 150.778V146.436H636.937V150.778C631.437 151.439 628.688 153.821 628.688 157.924C628.688 161.708 630.371 167.52 633.736 175.361L653.17 220.492L670.328 179.361C674.002 170.586 675.838 163.964 675.838 159.497C675.838 154.277 673.375 151.371 668.447 150.778V146.436H701.443V150.778ZM770.866 267.949V263.572C773.725 262.98 775.859 262.33 777.267 261.623C778.675 260.917 779.72 259.925 780.402 258.649C781.083 257.372 781.424 255.663 781.424 253.52C781.424 251.514 781.194 249.338 780.732 246.99C780.292 244.642 779.643 242.009 778.785 239.092L775.584 227.604H735.561L732.624 236.357C731.15 240.733 730.182 244.049 729.72 246.306C729.258 248.563 729.027 250.614 729.027 252.46C729.027 256.016 729.896 258.626 731.634 260.29C733.394 261.954 736.077 263.048 739.685 263.572V267.949H702.994V263.572C706.205 263.048 708.999 261.122 711.375 257.794C713.75 254.466 716.049 249.725 718.271 243.571L754.104 145H767.698L796.899 244.255C798.285 248.882 799.506 252.415 800.562 254.854C801.618 257.293 802.894 259.196 804.389 260.563C805.863 261.931 807.887 262.934 810.461 263.572V267.949H770.866ZM737.87 219.877H773.802L757.47 162.437L737.87 219.877ZM901.628 149V173.652H893.115C891.751 168.5 890.013 164.397 887.901 161.343C885.768 158.289 883.304 156.1 880.51 154.778C877.695 153.479 874.307 152.83 870.348 152.83C864.452 152.83 859.206 154.87 854.609 158.95C849.989 163.007 846.36 169.116 843.72 177.276C841.081 185.436 839.761 195.305 839.761 206.885C839.761 218.509 840.85 228.436 843.027 236.664C845.205 244.87 848.417 251.07 852.662 255.264C856.907 259.458 862.121 261.555 868.302 261.555C872.987 261.555 876.826 260.848 879.817 259.435C882.787 258.045 885.295 255.834 887.34 252.802C889.364 249.793 891.289 245.349 893.115 239.468H901.628V264.906C896.238 266.41 890.728 267.527 885.097 268.256C879.443 269.008 873.24 269.385 866.487 269.385C851.947 269.385 840.949 264.279 833.492 254.067C826.057 243.856 822.339 228.63 822.339 208.389C822.339 195.693 824.275 184.57 828.146 175.019C831.996 165.446 837.671 158.049 845.172 152.83C852.695 147.61 861.659 145 872.063 145C877.277 145 882.094 145.285 886.516 145.855C890.915 146.402 895.952 147.45 901.628 149ZM1000.61 149V173.652H992.102C990.738 168.5 988.989 164.397 986.855 161.343C984.744 158.289 982.28 156.1 979.464 154.778C976.671 153.479 973.294 152.83 969.335 152.83C963.439 152.83 958.182 154.87 953.563 158.95C948.965 163.007 945.347 169.116 942.707 177.276C940.067 185.436 938.748 195.305 938.748 206.885C938.748 218.509 939.836 228.436 942.014 236.664C944.192 244.87 947.403 251.07 951.649 255.264C955.872 259.458 961.086 261.555 967.289 261.555C971.974 261.555 975.813 260.848 978.804 259.435C981.774 258.045 984.271 255.834 986.294 252.802C988.34 249.793 990.276 245.349 992.102 239.468H1000.61V264.906C995.225 266.41 989.715 267.527 984.084 268.256C978.43 269.008 972.227 269.385 965.474 269.385C950.934 269.385 939.935 264.279 932.478 254.067C925.021 243.856 921.293 228.63 921.293 208.389C921.293 195.693 923.229 184.57 927.1 175.019C930.972 165.446 936.658 158.049 944.159 152.83C951.66 147.61 960.624 145 971.05 145C976.264 145 981.081 145.285 985.502 145.855C989.902 146.402 994.939 147.45 1000.61 149ZM1078.45 267.949V263.572C1081.31 262.98 1083.44 262.33 1084.85 261.623C1086.26 260.917 1087.3 259.925 1087.99 258.649C1088.67 257.372 1089.01 255.663 1089.01 253.52C1089.01 251.514 1088.78 249.338 1088.32 246.99C1087.88 244.642 1087.23 242.009 1086.37 239.092L1083.17 227.604H1043.15L1040.21 236.357C1038.74 240.733 1037.77 244.049 1037.31 246.306C1036.84 248.563 1036.61 250.614 1036.61 252.46C1036.61 256.016 1037.48 258.626 1039.22 260.29C1040.98 261.954 1043.66 263.048 1047.27 263.572V267.949H1010.58V263.572C1013.79 263.048 1016.58 261.122 1018.96 257.794C1021.34 254.466 1023.63 249.725 1025.86 243.571L1061.69 145H1075.28L1104.48 244.255C1105.87 248.882 1107.09 252.415 1108.15 254.854C1109.2 257.293 1110.48 259.196 1111.97 260.563C1113.45 261.931 1115.47 262.934 1118.05 263.572V267.949H1078.45ZM1045.46 219.877H1081.39L1065.05 162.437L1045.46 219.877ZM1220.04 245.691C1220.04 249.132 1220.12 251.72 1220.3 253.452C1220.48 255.161 1220.76 256.54 1221.16 257.589C1221.55 258.615 1222.04 259.458 1222.61 260.119C1223.18 260.757 1224.01 261.35 1225.08 261.897C1226.14 262.421 1227.78 262.98 1230 263.572V267.949H1194V263.572C1197.17 262.752 1199.38 261.84 1200.63 260.837C1201.89 259.811 1202.76 258.261 1203.24 256.187C1203.72 254.113 1203.97 250.614 1203.97 245.691V208.389H1156.22V245.691C1156.22 249.657 1156.34 252.563 1156.58 254.409C1156.85 256.255 1157.28 257.714 1157.87 258.786C1158.49 259.857 1159.38 260.746 1160.54 261.452C1161.71 262.159 1163.61 262.866 1166.25 263.572V267.949H1130.09V263.572C1133.63 262.638 1136.01 261.589 1137.22 260.427C1138.43 259.264 1139.22 257.612 1139.59 255.469C1139.97 253.349 1140.15 250.09 1140.15 245.691V168.694C1140.15 164.591 1140.01 161.605 1139.72 159.736C1139.44 157.867 1138.97 156.408 1138.31 155.36C1137.65 154.334 1136.77 153.502 1135.67 152.864C1134.59 152.248 1132.73 151.553 1130.09 150.778V146.436H1166.25V150.778C1163.74 151.439 1161.93 152.1 1160.81 152.761C1159.69 153.399 1158.8 154.209 1158.14 155.189C1157.48 156.169 1156.99 157.639 1156.68 159.599C1156.38 161.56 1156.22 164.591 1156.22 168.694V200.183H1203.97V168.694C1203.97 163.52 1203.72 159.987 1203.24 158.095C1202.76 156.18 1201.94 154.721 1200.8 153.719C1199.65 152.716 1197.39 151.736 1194 150.778V146.436H1230V150.778C1226.81 151.622 1224.58 152.556 1223.3 153.582C1222.05 154.63 1221.19 156.192 1220.73 158.266C1220.27 160.34 1220.04 163.816 1220.04 168.694V245.691Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
};

export default Logo;